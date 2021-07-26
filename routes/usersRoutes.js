const express = require("express");
const { session } = require("passport");
const passport = require("passport");
let { signup, signin } = require("../Controllers/usersController");

const router = express.Router();

router.post("/signup", signup);
router.post(
  "/signin",
  passport.authenticate("local", { session: false }),
  signin
);
module.exports = router;
