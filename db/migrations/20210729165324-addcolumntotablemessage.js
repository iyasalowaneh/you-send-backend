"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("Messages", "image", Sequelize.STRING, {
    });
  

  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("Messages", "image");
   
  },
};
