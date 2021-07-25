const express = require("express");
const cors = require("cors");
const passport = require("passport");
// const { localStrategy, jwtStrategy } = require("./middleware/passport");
const db = require("./db/models");

const app = express();
app.use(cors());
app.use(express.json());

//passport
app.use(passport.initialize());
// passport.use(localStrategy);
// passport.use(jwtStrategy);

//Routes


app.use("/media", express.static("media"));

//error middleware
app.use((err, req, res, next) => {
  res
    .status(err.status || 500)
    .json({ message: err.message || "Internal Server Error" });
});
app.use((req, res, next) => {
  res.status(404).json({ message: "path not found" });
});

app.listen(8000);
