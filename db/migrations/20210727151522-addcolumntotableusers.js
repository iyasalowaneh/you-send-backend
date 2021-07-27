"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
  

 
    await queryInterface.addColumn("Users", "image", Sequelize.STRING, {
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("Users", "image");
  },
};
