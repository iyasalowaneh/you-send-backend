const SequelizeSlugify = require("sequelize-slugify");


module.exports = Room = (sequelize, DataTypes) => {
  const Room = sequelize.define("Room", {
    name: { type: DataTypes.STRING },
 
  });

  SequelizeSlugify.slugifyModel(Room, { source: ["name"] });

  Room.associate = (models) => {
    Room.belongsToMany(models.User, {
      through: "Room_User",
      as: "users",
      foreignKey: "roomId",
    });
    models.User.belongsToMany(Room, {
      through: "Room_User",
      as: "rooms",
      foreignKey: "userId",
    });
  };


  return Room;
};
