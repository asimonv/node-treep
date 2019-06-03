module.exports = {
  up(queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.addColumn('Comments', 'createdAt', {
        allowNull: false,
        type: Sequelize.DATE,
      }),
      queryInterface.addColumn('Comments', 'updatedAt', {
        allowNull: false,
        type: Sequelize.DATE,
      }),
    ]);
  },

  down(queryInterface) {
    return Promise.all([
      queryInterface.removeColumn('Comments', 'createdAt'),
      queryInterface.removeColumn('Comments', 'updatedAt'),
    ]);
  },
};
