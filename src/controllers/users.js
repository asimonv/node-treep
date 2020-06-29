const db = require("../models");

const getUserVotes = async ({ sub }) => {
  const votes = db.Vote.findAll({
    where: { userId: sub },
    include: [{ model: db.VoteLink, as: "info" }],
  });
  return votes;
};

module.exports = {
  getUserVotes,
};
