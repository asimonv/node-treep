"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn("Teachers", "factor", {
      type: Sequelize.FLOAT,
      allowNull: false,
      defaultValue: 0,
    });
  },

  down: queryInterface => {
    return queryInterface.removeColumn("Teachers", "factor");
  },
};
