"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
  

 
    await queryInterface.addColumn("Rooms", "slug", Sequelize.STRING, { 
       slug: {
      type: Sequelize.STRING,
      unique: true,
    },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("Rooms", "slug");
  },
};
