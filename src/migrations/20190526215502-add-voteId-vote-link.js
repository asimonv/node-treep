module.exports = {
  up(queryInterface, Sequelize) {
    return queryInterface.addColumn('VoteLinks', 'VoteId', {
      type: Sequelize.INTEGER,
      allowNull: false,
    });
  },

  down(queryInterface) {
    return queryInterface.removeColumn('VoteLinks', 'VoteId');
  },
};
