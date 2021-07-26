module.exports = User = (sequelize, DataTypes) => {
  const User = sequelize.define("User", {
    firstName: { type: DataTypes.STRING, allowNull: false },
    lastName: { type: DataTypes.STRING, allowNull: false },
    username: { type: DataTypes.STRING, allowNull: false, unique: true },
    password: { type: DataTypes.STRING, allowNull: false, unique: true },
    status: { type: DataTypes.STRING },
  });

  return User;
};
