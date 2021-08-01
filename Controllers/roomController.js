const express = require("express");
let { Room } = require("../db/models");
let { User } = require("../db/models");
let { Message } = require("../db/models");
let {Room_User} = require("../db/models");

let { JWT_EXPIRATION_MS, JWT_SECRET } = require("../config/key");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");



exports.fetchRoom = async (roomId, next) => {
  try {
    const room = await Room.findByPk(roomId);

    return room;
  } catch (error) {
    next(error);
  }
};
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

    const newRoom = await Room.create(req.body);
    const roomUsers = req.body.users.map((user) => ({
      userId:user,
      roomId: newRoom.id,
    }));

    const newRoomUsers = await Room_User.bulkCreate(roomUsers);

    res.status(201).json(newRoomUsers);

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
        attributes: ["id"],
      },
    });
    res.json(rooms);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};


