/*  eslint no-unused-vars: ["error", { "args": "none" }]  */

module.exports = {
  up(queryInterface, Sequelize) {
    return queryInterface.createTable("VoteLinks", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      table: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      foreign_key: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },

  down(queryInterface, Sequelize) {
    return queryInterface.dropTable("VoteLinks");
  },
};
