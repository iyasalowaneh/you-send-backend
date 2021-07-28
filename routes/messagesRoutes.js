const express = require("express");
const { session } = require("passport"); //Remove unused import
const passport = require("passport"); //Remove unused import
let {
  messageCreat, //Remove unused import
  messageList,
  fetchMessage, //Remove unused import
} = require("../Controllers/messagesController");
let { fetchUser } = require("../Controllers/usersController");

const router = express.Router();

router.param("senderId", async (req, res, next, senderId) => {
  const user = await fetchUser(senderId, next);
  if (user) {
    req.user = user;
    next();
  } else {
    const err = new Error("user not found");
    err.status = 404;
    next(err);
  }
});

router.get("/", messageList);

module.exports = router;
