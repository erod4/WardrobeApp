const jwt = require("jsonwebtoken");

const generateToken = () => {
  return jwt.sign({ id }, process.env.JWT_SECRET_KEY, { expiresIn: "30 days" });
};
module.exports = generateToken;
