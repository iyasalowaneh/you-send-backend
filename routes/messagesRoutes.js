const express = require("express");
const { session } = require("passport");
const passport = require("passport");
let {
  messageCreat,
  messageList,
  fetchMessage,
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

router.get("/messages", messageList);
// REVIEW: Never put a verb in the path
router.post(
  "/messageCreat",
  passport.authenticate("jwt", { session: false }),
  messageCreat
);

module.exports = router;
