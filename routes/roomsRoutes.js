const express = require("express");
const { session } = require("passport"); //Remove unused import
const passport = require("passport");
let {
  messageCreat,
  roomList,
  fetchRoom,
  roomCreat,
} = require("../Controllers/roomController");

const router = express.Router();
router.param("roomId", async (req, res, next, roomId) => {
  const room = await fetchRoom(roomId, next);
  if (room) {
    req.room = room;
    next();
  } else {
    const err = new Error("user not found");
    err.status = 404;
    next(err);
  }
});

router.post("/", roomCreat);
router.get("/", roomList);
router.post(
  "/:roomId/messageCreat",
  passport.authenticate("jwt", { session: false }),
  messageCreat
);

module.exports = router;
