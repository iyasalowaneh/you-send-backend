module.exports = Message = (sequelize, DataTypes) => {
  const Message = sequelize.define("Message", {
    content: { type: DataTypes.STRING },
  });

  Message.associate = (models) => {
    models.User.hasMany(Message, {
      foreignKey: "senderId",
      as: "Messages",
    });
    Message.belongsTo(models.User, {
      foreignKey: "senderId",
    });

    models.Room.hasMany(Message, {
      foreignKey: "roomId",
      as: "Messages",
    });
    Message.belongsTo(models.Room, {
      foreignKey: "roomId",
    });
  };

  return Message;
};
