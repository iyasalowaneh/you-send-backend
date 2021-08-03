const express = require("express");
const { session } = require("passport");
const passport = require("passport");
let {
  signup,
  signin,
  updateUser,
  fetchUser,
  printUsers,
  removeUser,
} = require("../Controllers/usersController");
const upload = require("../middleware/multer");

const router = express.Router();
router.param("userId", async (req, res, next, userId) => {
  const user = await fetchUser(userId, next);
  if (user) {
    req.user = user;
    next();
  } else {
    const err = new Error("user not found");
    err.status = 404;
    next(err);
  }
});
router.delete("/:userId", removeUser);

router.post("/signup", upload.single("image"), signup);
router.post(
  "/signin",
  passport.authenticate("local", { session: false }),
  signin
);
router.put(
  "/userUpdate",
  passport.authenticate("jwt", { session: false }),
  upload.single("image"),

  updateUser
);

router.get("/users", printUsers);

module.exports = router;
