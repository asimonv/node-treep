module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Courses', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    courseNumber: {
      type: Sequelize.STRING,
    },
    name: {
      type: Sequelize.STRING,
    },
    ua: {
      type: Sequelize.STRING,
    },
    description: {
      type: Sequelize.TEXT,
    },
    englishName: {
      type: Sequelize.TEXT,
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
  }),

  down: queryInterface => queryInterface.dropTable('Courses'),
};
