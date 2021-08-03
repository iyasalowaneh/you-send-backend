"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("Rooms", "image", Sequelize.STRING, {
    });
  

  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("Rooms", "image");
   
  },
};
