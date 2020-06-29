const db = require("../models");
const _ = require("lodash");
const average = require("../helpers/stats");
const getRandomEmoji = require("../helpers/emoji");

const statsRepr = [
  "popularity",
  "knowledge",
  "clarity",
  "demand",
  "disposition",
];

const getTeacher = async ({ teacherId }) => {
  const teacher = db.Teacher.findOne({
    where: { id: teacherId },
  });
  return teacher;
};

const getStats = async ({ teacherId }) => {
  const teacher = await getTeacher({ teacherId });
  const votes = await teacher.getVotes();

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

const factorReducer = (acc, curr) => acc.value + curr.value;
const votesReducer = (acc, curr) => acc.votes + curr.votes;

const upsert = async values => {
  const { action, ...withoutValue } = values;
  const { teacherId, userId, voteType } = withoutValue;
  const teacher = await getTeacher({ teacherId });
  const checkVote = await teacher.getVotes({
    where: { userId, voteType },
  });

  if (checkVote.length > 0) {
    if (action === "vote") {
      return checkVote.update(values);
    }
    await checkVote[0].destroy();
    return checkVote[0];
  }

  const vote = await db.Vote.create(values);
  await teacher.addVote(vote);

  // update factor

  const votes = await getStats({ teacherId });

  const reducedVotes = votes.reduce(factorReducer);
  const votesNumber = votes.reduce(votesReducer);
  const updatedFactor = votesNumber > 0 ? reducedVotes / votesNumber : 0;

  console.log(votes);
  console.log(reducedVotes);
  console.log(votesNumber);
  console.log(updatedFactor);

  await teacher.update({ factor: updatedFactor });
  console.log("Teacher updated");

  const voteInfo = await vote.getInfo();

  //  somehow create with includes won't work
  const response = { ...vote.toJSON(), info: { ...voteInfo.toJSON() } };
  return response;
};

const sendStat = async values => upsert(values);

const getComments = async ({ teacherId }) => {
  const teacher = await getTeacher({ teacherId });
  let comments = await teacher.getComments({
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
  const { teacherId, text, sub: userId } = data;
  const teacher = await getTeacher({ teacherId });
  const comment = await db.Comment.create({ text, userId });
  await teacher.addComment(comment);
  const commentInfo = await comment.getInfo();
  const response = {
    ...comment.toJSON(),
    info: { ...commentInfo.toJSON() },
    userId: `${getRandomEmoji()}${getRandomEmoji()}${getRandomEmoji()}${getRandomEmoji()}`,
  };
  return response;
};

module.exports = {
  getTeacher,
  getStats,
  getComments,
  postComment,
  sendStat,
};
