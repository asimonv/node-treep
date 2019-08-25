const db = require('../models');
const _ = require('lodash');
const average = require('../helpers/stats');

const statsRepr = ['popularity', 'knowledge', 'clarity', 'demand', 'disposition'];

const getTeacher = async ({ teacherId }) => {
  const teacher = db.Teacher.findOne({
    where: { id: teacherId },
  });
  return teacher;
};

const upsert = async (values) => {
  const { value, action, ...withoutValue } = values;
  const { teacherId, userId, voteType } = withoutValue;
  const teacher = await getTeacher({ teacherId });
  const checkVote = await teacher.getVotes({
    where: { userId, voteType },
  });

  if (checkVote.length > 0) {
    if (action === 'vote') {
      return checkVote.update(values);
    }
    await checkVote[0].destroy();
    return checkVote[0];
  }
  const vote = await db.Vote.create(values);
  await teacher.addVote(vote);
  const voteInfo = await vote.getInfo();
  //  somehow create with includes won't work
  const response = { ...vote.toJSON(), info: { ...voteInfo.toJSON() } };
  return response;
};

const sendStat = async values => upsert(values);

const getComments = async ({ teacherId }) => {
  const teacher = await getTeacher({ teacherId });
  return teacher.getComments({
    order: [['createdAt', 'DESC']],
  });
};

const postComment = async (data) => {
  const { teacherId, text, sub: userId } = data;
  const teacher = await getTeacher({ teacherId });
  const comment = await db.Comment.create({ text, userId });
  await teacher.addComment(comment);
  const commentInfo = await comment.getInfo();
  const response = { ...comment.toJSON(), info: { ...commentInfo.toJSON() } };
  return response;
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

  return _.merge(response, groupedVotes);
};

module.exports = {
  getTeacher,
  getStats,
  getComments,
  postComment,
  sendStat,
};
