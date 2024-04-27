const express = require("express");
const {
  registerController,
  loginController,
} = require("../../Controllers/UserController/UserController");

const UserRoute = express.Router();

UserRoute.post("/register", registerController);
UserRoute.get("/login", loginController);

module.exports = UserRoute;
