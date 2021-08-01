const SequelizeSlugify = require("sequelize-slugify");

module.exports = Room = (sequelize, DataTypes) => {
  const Room = sequelize.define("Room", {
    name: { type: DataTypes.STRING },
  });

  SequelizeSlugify.slugifyModel(Room, { source: ["name"] });

  Room.associate = (models) => {
    Room.belongsToMany(models.User, {
      through: models.Room_User,
      foreignKey: "roomId",
    });
    models.User.belongsToMany(Room, {
      through: models.Room_User,
      foreignKey: "userId",
    });
  };

  return Room;
};
