const bcrypt = require("bcrypt");
const { User } = require("../db/models");
const LocalStrategy = require("passport-local").Strategy;
const JWTStrategy = require("passport-jwt").Strategy;
const { fromAuthHeaderAsBearerToken } = require("passport-jwt").ExtractJwt;
let { JWT_SECRET } = require("../config/key");

exports.localStrategy = new LocalStrategy(async (username, password, done) => {
  try {
    const user = await User.findOne({
      where: { username: username },
    });

    const passowrdMatch = user
      ? await bcrypt.compare(password, user.password)
      : false;
    return done(null, passowrdMatch ? user : false);
  } catch (error) {
    done(error);
  }
});

exports.jwtStrategy = new JWTStrategy(
  { jwtFromRequest: fromAuthHeaderAsBearerToken(), secretOrKey: JWT_SECRET },
  async (jwtPayload, done) => {
    if (Date.now > jwtPayload.exp) {
      return done(false);
    }
    try {
      const user = await User.findByPk(jwtPayload.id);
      return done(null, user);
    } catch (error) {
      return done(error);
    }
  }
);
