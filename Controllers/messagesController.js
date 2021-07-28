const express = require("express");
let { Message } = require("../db/models");
let { JWT_EXPIRATION_MS, JWT_SECRET } = require("../config/key");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");




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


exports.fetchMessage = async (messageId, next) => {
    try {
      const message = await Message.findByPk(messageId);
  
      return message;
    } catch (error) {
      next(error);
    }
  };