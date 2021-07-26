"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("Users", "firstName", Sequelize.STRING, {
      allowNull: false,
    });
    await queryInterface.addColumn("Users", "lastName", Sequelize.STRING, {
      allowNull: false,
    });

    await queryInterface.addColumn("Users", "username", Sequelize.STRING, {
      allowNull: false,
      unique: true,
    });
    await queryInterface.addColumn("Users", "password", Sequelize.STRING, {
      allowNull: false,
      unique: true,
    });
    await queryInterface.addColumn("Users", "status", Sequelize.STRING, {
      allowNull: false,
      unique: true,
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("Users", "firstName");
    await queryInterface.removeColumn("Users", "lastName");
    await queryInterface.removeColumn("Users", "username");
    await queryInterface.removeColumn("Users", "password");
    await queryInterface.removeColumn("Users", "status");
  },
};
