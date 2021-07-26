"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("Users", "firstName", Sequelize.STRING, {
    });
    await queryInterface.addColumn("Users", "lastName", Sequelize.STRING, {
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
    await queryInterface.removeColumn("Users", "firstName");
    await queryInterface.removeColumn("Users", "lastName");
    await queryInterface.removeColumn("Users", "phonenumber");
    await queryInterface.removeColumn("Users", "code");
    await queryInterface.removeColumn("Users", "status");
  },
};
