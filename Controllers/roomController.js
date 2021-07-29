const express = require("express");
let { Room } = require("../db/models");
let { User } = require("../db/models");

let { JWT_EXPIRATION_MS, JWT_SECRET } = require("../config/key");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

let { Message } = require("../db/models");

exports.messageCreat = async (req, res, next) => {
  try {
    req.body.roomId = req.room.id;
    req.body.senderId = req.user.id;

    const newMessage = await Message.create(req.body);
    res.status(201).json(newMessage);

    next({
      status: 401,
      message: "you can not create a Message",
    });
  } catch (error) {
    next(error);
  }
};

exports.roomCreat = async (req, res, next) => {
  try {
    //  req.body.roomId = req.user.id;

    const newRoom = await Room.create(req.body);
    res.status(201).json(newRoom);

    next({
      status: 401,
      message: "you can not create a room",
    });
  } catch (error) {
    next(error);
  }
};

exports.roomList = async (req, res) => {
  try {
    const rooms = await Room.findAll({
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
      include: {
        model: User,
        as : "users",
        attributes: ["id"],
      },

    });
    res.json(rooms);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

exports.fetchRoom = async (roomId, next) => {
  try {
    const room = await Room.findByPk(roomId);

    return room;
  } catch (error) {
    next(error);
  }
};
