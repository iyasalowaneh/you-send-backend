"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("Messages", "roomId", Sequelize.INTEGER, {
      allowNull: false,
      references: {
        model: {
          tableName: "Rooms",
        },
        key: "id",
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("Messages", "roomId");
  },
};