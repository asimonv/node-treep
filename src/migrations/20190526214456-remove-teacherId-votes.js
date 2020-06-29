module.exports = {
  up: queryInterface => queryInterface.removeColumn("Votes", "teacherId"),

  down: (queryInterface, Sequelize) =>
    queryInterface.addColumn("Votes", "teacherId", {
      type: Sequelize.STRING,
      allowNull: false,
    }),
};
