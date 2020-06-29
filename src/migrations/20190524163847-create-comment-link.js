/*  eslint no-unused-vars: ["error", { "args": "none" }]  */

module.exports = {
  up(queryInterface, Sequelize) {
    return queryInterface.createTable("CommentLinks", {
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
    });
  },

  down(queryInterface, Sequelize) {
    return queryInterface.dropTable("CommentLinks");
  },
};
