const db = require("../models");
const Boom = require("@hapi/boom");

const postReport = async data => {
  const { commentId, text, sub: userId } = data;
  const comment = await db.Course.findOne({
    where: { id: commentId },
  });
  if (comment) {
    const report = await db.Comment.postReport({ text, userId });
    return report;
  }
  throw Boom.unauthorized("Invalid comment");
};

module.exports = {
  postReport,
};
