const express = require("express");
let { User } = require("../db/models");
let { JWT_EXPIRATION_MS ,JWT_SECRET} = require("../config/key");
const bcrypt = require("bcrypt");
const jwt  = require("jsonwebtoken");
exports.signup = async (req, res, next) => {
  try {
    const saltRounds = 10;
    req.body.password = await bcrypt.hash(req.body.password, saltRounds);
    const newUser = await User.create(req.body);
    const token = generteToken(newUser);

    res.status(201).json({ token: token });
  } catch (error) {
    next(error);
  }
};

exports.signin = async (req, res, next) => {
  const token = generteToken(req.user);
  res.json({ token });
};

const generteToken = (user) => {
  const payload = {
    id: user.id,
    username: user.username,
    firstName: user.firstName,
    lastName: user.lastName,
    exp: Date.now() + parseInt(JWT_EXPIRATION_MS),
  };
  const token = jwt.sign(payload,JWT_SECRET);
  return token;
};
