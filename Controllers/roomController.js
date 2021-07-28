const express = require("express");
let { Room } = require("../db/models");
let { JWT_EXPIRATION_MS, JWT_SECRET } = require("../config/key");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");



exports.roomCreat = async (req, res, next) => {
    try {
       
        // req.body.messageId = req.room.id;

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