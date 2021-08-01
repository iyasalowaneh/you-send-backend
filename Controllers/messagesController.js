const express = require("express");
let { Message } = require("../db/models");
let { JWT_EXPIRATION_MS, JWT_SECRET } = require("../config/key");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


exports.messageCreat = async (req, res, next) => {
  try {
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


exports.messageList = async (req, res) => {
    try {
      const messages = await Message.findAll({
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
      });
      res.json(messages);
    } catch (error) {
      res.status(500).json({ message: "Server Error" });
    }
  };

  exports.messageListByUser = async (req, res) => {
    try {
      const userMessage = await Message.findOne({ where: { senderId: User.id } })
        console.log(userMessage)
      
      res.json(userMessage);
    } catch (error) {
      res.status(500).json({ message: "Server Error" });
    }
  };







exports.fetchMessage = async (messageId, next) => {
    try {
      const message = await Message.findByPk(messageId);
  
      return message;
    } catch (error) {
      next(error);
    }
  };

 