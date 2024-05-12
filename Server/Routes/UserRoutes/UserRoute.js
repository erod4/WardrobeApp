const express = require("express");
const {
  registerController,
  getUserController,
  loginController,
} = require("../../Controllers/UserController/UserController");
const isLoggedIn = require("../../Middleware/isLoggedIn");

const UserRoute = express.Router();

UserRoute.post("/register", registerController);
UserRoute.post("/login", loginController);
UserRoute.get("/getUser", isLoggedIn, getUserController);

module.exports = UserRoute;
