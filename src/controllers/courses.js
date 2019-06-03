const db = require('../models');
const Sequelize = require('sequelize');

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
  const votes = await course.getVotes({
    group: [
      'Vote.voteType',
      'VoteLink.table',
      'VoteLink.foreign_key',
      'VoteLink.createdAt',
      'VoteLink.updatedAt',
      'VoteLink.VoteId',
    ],
    attributes: [
      'voteType',
      [Sequelize.fn('AVG', Sequelize.col('Vote.value')), 'avg'],
      [Sequelize.fn('COUNT', Sequelize.col('Vote.id')), 'count'],
    ],
  });

  const response = {
    popularity: {
      votes: 0,
      value: 0,
      meta: {
        repr: 0,
      },
    },
    demand: {
      votes: 0,
      value: 0,
      meta: {
        repr: 1,
      },
    },
    difficulty: {
      votes: 0,
      value: 0,
      meta: {
        repr: 2,
      },
    },
    interesting: {
      votes: 0,
      value: 0,
      meta: {
        repr: 3,
      },
    },
  };

  votes.forEach((v) => {
    const stat = v.toJSON();
    const responseStat = response[statsRepr[stat.voteType]];
    responseStat.votes = Number(stat.count);
    responseStat.value = Number(stat.avg).toFixed(1);
  });
  return response;
};

module.exports = {
  getCourse,
  getStats,
  getComments,
  postComment,
  sendStat,
};
