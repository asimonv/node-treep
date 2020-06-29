module.exports = {
  up(queryInterface, Sequelize) {
    return queryInterface.addColumn("Votes", "teacherId", {
      type: Sequelize.INTEGER,
      allowNull: false,
    });
  },

  down(queryInterface, Sequelize) {
    return queryInterface.removeColumn("Votes", "teacherId", {
      type: Sequelize.INTEGER,
      allowNull: false,
    });
  },
};
