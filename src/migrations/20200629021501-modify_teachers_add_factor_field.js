

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.addColumn("Teachers", "factor", {
    type: Sequelize.DOUBLE,
    allowNull: false,
    defaultValue: 0,
  }),

  down: queryInterface => queryInterface.removeColumn("Teachers", "factor"),
};
