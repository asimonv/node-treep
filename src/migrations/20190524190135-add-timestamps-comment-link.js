module.exports = {
  up(queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.addColumn('CommentLinks', 'createdAt', {
        allowNull: false,
        type: Sequelize.DATE,
      }),
      queryInterface.addColumn('CommentLinks', 'updatedAt', {
        allowNull: false,
        type: Sequelize.DATE,
      }),
    ]);
  },

  down(queryInterface) {
    return Promise.all([
      queryInterface.removeColumn('CommentLinks', 'createdAt'),
      queryInterface.removeColumn('CommentLinks', 'updatedAt'),
    ]);
  },
};
