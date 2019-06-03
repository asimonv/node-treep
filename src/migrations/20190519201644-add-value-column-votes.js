module.exports = {
  up(queryInterface, Sequelize) {
    return queryInterface.addColumn('Votes', 'value', {
      type: Sequelize.INTEGER,
      allowNull: false,
    });
  },

  down(queryInterface, Sequelize) {
    return queryInterface.removeColumn('Votes', 'value', {
      type: Sequelize.INTEGER,
      allowNull: false,
    });
  },
};
