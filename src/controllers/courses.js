const db = require('../models');
const _ = require('lodash');
const average = require('../helpers/stats');

// TODO: import it from external source
const statsRepr = ['popularity', 'demand', 'difficulty', 'interesting'];

const getCourse = async ({ courseId }) => {
  const course = db.Course.findOne({
    where: { id: courseId },
  });
  return course;
};

const upsert = async (values) => {
  const { value, action, ...withoutValue } = values;
  const { courseId, userId, voteType } = withoutValue;
  const course = await getCourse({ courseId });
  const checkVote = await course.getVotes({
    where: { userId, voteType },
  });

  if (checkVote.length !== 0) {
    if (action === 'vote') {
      return checkVote.update(values);
    }
    await checkVote[0].destroy();
    return checkVote[0];
  }
  const vote = await db.Vote.create(values);
  await course.addVote(vote);
  const voteInfo = await vote.getInfo();
  //  somehow create with includes won't work
  const response = { ...vote.toJSON(), info: { ...voteInfo.toJSON() } };
  return response;
};

const sendStat = async values => upsert(values);

const getComments = async ({ courseId }) => {
  const course = await getCourse({ courseId });
  return course.getComments();
};

const postComment = async (data) => {
  const { courseId, text, sub: userId } = data;
  const course = await getCourse({ courseId });
  const comment = await db.Comment.create({ text, userId });
  return course.addComment(comment);
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
    .groupBy('voteType')
    .map((v, k) => ({
      meta: {
        repr: parseInt(k, 10),
      },
      voteType: statsRepr[parseInt(k, 10)],
      votes: v.length,
      value: average(v.map(x => x.value)),
    }))
    .value();

  const mergedVotes = _.merge(response, groupedVotes);
  console.log(mergedVotes);
  return mergedVotes;
};

module.exports = {
  getCourse,
  getStats,
  getComments,
  postComment,
  sendStat,
};
