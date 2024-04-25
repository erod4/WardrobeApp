const express = require("express");
const {
  registerController,
  loginController,
} = require("../../Controllers/UserController/UserController");

const UserRoute = express.Router();

UserRoute.post("/", registerController);
UserRoute.get("/:id", loginController);

module.exports = UserRoute;
