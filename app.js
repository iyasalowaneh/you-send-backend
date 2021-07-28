const express = require("express");
const cors = require("cors");

//Authentication
const passport = require("passport");
const { localStrategy, jwtStrategy } = require("./middleware/passport");

//Route Imports
const userRoutes = require("./routes/usersRoutes");
const messagesRoutes = require("./routes/messagesRoutes");
const roomsRoutes = require("./routes/roomsRoutes");

const db = require("./db/models"); //Remove unused import

const app = express();

app.use(cors());
app.use(express.json());

//Passport Middleware
app.use(passport.initialize());
passport.use(localStrategy);
passport.use(jwtStrategy);

//Routes
app.use("/", userRoutes);
app.use("/media", express.static("media"));
app.use("/rooms", roomsRoutes);
app.use("/messages", messagesRoutes);

//Error Middleware
app.use((err, req, res, next) => {
  res
    .status(err.status || 500)
    .json({ message: err.message || "Internal Server Error" });
});

//Path Not Found Middleware
app.use((req, res, next) => {
  res.status(404).json({ message: "path not found" });
});

app.listen(8000);
