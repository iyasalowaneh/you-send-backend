

module.exports = Room = (sequelize, DataTypes) => {
  const Room = sequelize.define("Room", {
    name: { type: DataTypes.STRING },
 
  });



  return Room;
};
