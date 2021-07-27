"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("Users", "name", Sequelize.STRING, {
    });
  

    await queryInterface.addColumn("Users", "phonenumber", Sequelize.STRING, {
      allowNull: false,
      unique: true,
    });
    await queryInterface.addColumn("Users", "code", Sequelize.STRING, {
      allowNull: false,
      unique: true,
    });
    await queryInterface.addColumn("Users", "status", Sequelize.STRING, {
      unique: true,
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("Users", "name");
    await queryInterface.removeColumn("Users", "phonenumber");
    await queryInterface.removeColumn("Users", "code");
    await queryInterface.removeColumn("Users", "status");
  },
};
