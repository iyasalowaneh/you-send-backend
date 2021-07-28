"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
  

 
    await queryInterface.addColumn("Messages", "slug", Sequelize.STRING, { 
       slug: {
      type: Sequelize.STRING,
      unique: true,
    },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("Messages", "slug");
  },
};
