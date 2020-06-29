const db = require("../models");
const _ = require("lodash");
const average = require("../helpers/stats");
const getRandomEmoji = require("../helpers/emoji");
// TODO: import it from external source
const statsRepr = ["popularity", "demand", "difficulty", "interesting"];

const getCourse = async ({ courseId }) => {
  const course = db.Course.findOne({
    where: { id: courseId },
  });
  return course;
};

const getStats = async ({ courseId }) => {
  const course = await getCourse({ courseId });
  const votes = await course.getVotes();

  const response = statsRepr.map((x, idx) => ({
    meta: {
      repr: idx,
    },
    voteType: statsRepr[idx],
    votes: 0,
    value: 0,
  }));

  const groupedVotes = _.chain(votes.map(x => x.toJSON()))
    .groupBy("voteType")
    .map((v, k) => ({
      meta: {
        repr: parseInt(k, 10),
      },
      voteType: statsRepr[parseInt(k, 10)],
      votes: v.length,
      value: average(v.map(x => x.value)),
    }))
    .value();

  const mergedVotes = _.unionBy(groupedVotes, response, "voteType");
  return _.orderBy(mergedVotes, [x => x.meta.repr]);
};

const factorReducer = (acc, curr) => acc + curr.value;
const votesReducer = (acc, curr) => acc + curr.votes;

const upsert = async values => {
  const { action, ...withoutValue } = values;
  const { courseId, userId, voteType } = withoutValue;
  const course = await getCourse({ courseId });
  const checkVote = await course.getVotes({
    where: { userId, voteType },
  });

  if (checkVote.length !== 0) {
    if (action === "vote") {
      return checkVote.update(values);
    }
    await checkVote[0].destroy();
    return checkVote[0];
  }
  const vote = await db.Vote.create(values);
  await course.addVote(vote);

  // update factor

  const votes = await getStats({ courseId });

  const reducedVotes = votes.reduce(factorReducer, 0);
  const votesNumber = votes.reduce(votesReducer, 0);
  const updatedFactor = votesNumber > 0 ? reducedVotes / votesNumber : 0;

  await course.update({ factor: updatedFactor });

  const voteInfo = await vote.getInfo();
  //  somehow create with includes won't work
  const response = { ...vote.toJSON(), info: { ...voteInfo.toJSON() } };
  return response;
};

const sendStat = async values => upsert(values);

const getComments = async ({ courseId }) => {
  const course = await getCourse({ courseId });
  let comments = await course.getComments({
    order: [["createdAt", "DESC"]],
  });

  //  LOL
  comments = _.chain(comments.map(x => x.toJSON()))
    .map(x => ({
      ...x,
      userId: `${getRandomEmoji()}${getRandomEmoji()}${getRandomEmoji()}${getRandomEmoji()}`,
    }))
    .value();

  return comments;
};

const postComment = async data => {
  const { courseId, text, sub: userId } = data;
  const course = await getCourse({ courseId });
  const comment = await db.Comment.create({ text, userId });
  await course.addComment(comment);
  const commentInfo = await comment.getInfo();
  const response = {
    ...comment.toJSON(),
    info: { ...commentInfo.toJSON() },
    userId: `${getRandomEmoji()}${getRandomEmoji()}${getRandomEmoji()}${getRandomEmoji()}`,
  };
  return response;
};

module.exports = {
  getCourse,
  getStats,
  getComments,
  postComment,
  sendStat,
};
