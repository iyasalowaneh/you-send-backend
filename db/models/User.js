module.exports = User = (sequelize, DataTypes) => {
  const User = sequelize.define("User", {
    name: { type: DataTypes.STRING },
    phonenumber: { type: DataTypes.STRING, allowNull: false, unique: true },
    code: { type: DataTypes.STRING, allowNull: false },
    status: { type: DataTypes.STRING },
  });

  return User;
};
