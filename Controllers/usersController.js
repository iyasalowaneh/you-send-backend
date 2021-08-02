const express = require("express");
let { User } = require("../db/models");
let { JWT_EXPIRATION_MS, JWT_SECRET } = require("../config/key");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const twilio = require("twilio");
exports.signup = async (req, res, next) => {
  try {
    let code = Math.floor(100000 + Math.random() * 900000);
    let client = new twilio(
      "AC2367b6cf83997dfed8e9eddafb4305ff",
      "738973ecef9b0402355e76d83ec8040d"
    );
    client.messages
      .create({
        body: `your code is ${code}`,
        to: req.body.phonenumber, // Text this number
        from: "+19387770848", // From a valid Twilio number
      })
      .then((message) => console.log(message.sid));
    const myUser = await User.findOne({
      where: { phonenumber: req.body.phonenumber },
    });
    if (myUser) await myUser.update({ code });
    else
      await User.create({
        phonenumber: req.body.phonenumber,
        name: req.body.name,
        status: req.body.status,
        code,
      });
    // const token = generteToken(newUser);

    res.status(201).json("sucess");
  } catch (error) {
    next(error);
  }
};

exports.signin = async (req, res, next) => {
  const token = generteToken(req.user);
  res.json({ token });
};

// REVIEW: generate, fix typo
const generteToken = (user) => {
  const payload = {
    id: user.id,
    name: user.name,

    exp: Date.now() + parseInt(JWT_EXPIRATION_MS),
  };
  const token = jwt.sign(payload, JWT_SECRET);
  return token;
};
// REVIEW: Remove commented out code
// exports.updateUser = async (req, res, next) => {
//   console.log(req.User)
//   try {
//     // if (req.file) {
//     //   req.body.image =` http://${req.get("host")}/media/${req.file.filename}`;
//     // }
//     await User.update(req.body);
//     res.status(201).json(req.user);
//   } catch (error) {
//     next(error);
//   }
// };

exports.updateUser = async (req, res, next) => {
  try {
    // if (req.file) {
    //   req.body.image = http://${req.get("host")}/media/${req.file.filename};
    // }
    await req.user.update(req.body);
    res.status(201).json(req.user);
  } catch (error) {
    next(error);
  }
};

exports.fetchUser = async (userId, next) => {
  try {
    const user = await User.findByPk(userId);

    return user;
  } catch (error) {
    next(error);
  }
};

// REVIEW: Should be fetchUsers
exports.printUsers = async (req, res, next) => {
  try {
    const users = await User.findAll({
      attributes: { exclude: ["createdAt", "updatedAt"] },
    });
    res.json(users);
  } catch (error) {
    next(error);
  }
};
