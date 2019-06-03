module.exports = {
  up(queryInterface, Sequelize) {
    return queryInterface.addColumn('CommentLinks', 'CommentId', {
      type: Sequelize.INTEGER,
      allowNull: false,
    });
  },

  down(queryInterface) {
    return queryInterface.removeColumn('CommentLinks', 'CommentId');
  },
};
