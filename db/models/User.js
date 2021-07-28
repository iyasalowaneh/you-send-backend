const SequelizeSlugify = require("sequelize-slugify");

module.exports = User = (sequelize, DataTypes) => {
  const User = sequelize.define("User", {
    name: { type: DataTypes.STRING },
    phonenumber: { type: DataTypes.STRING, allowNull: false, unique: true }, //Change to phoneNumber or number
    code: { type: DataTypes.STRING, allowNull: false },
    status: { type: DataTypes.STRING },
    image: { type: DataTypes.STRING },
    slug: {
      type: DataTypes.STRING,
      unique: true,
    },
  });

  SequelizeSlugify.slugifyModel(User, { source: ["name"] });

  return User;
};
