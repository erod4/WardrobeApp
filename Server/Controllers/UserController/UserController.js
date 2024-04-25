const User = require("../../Models/UsersModel/UserModel");
const AppErr = require("../../Utils/AppError");
const bcrypt = require("bcrypt");
const generateToken = require("../../Utils/genToken");

const registerController = async (req, res, next) => {
  const { phone, name, password } = req.body;

  try {
    const userFound = await User.findOne({ phone });
    if (userFound) {
      return next(new AppErr("Phone Number In Use", 400));
    }
    const salt = bcrypt.genSalt(10);
    const hashedPassword = bcrypt.hash(password, salt);

    const user = await User.create({ phone, password: hashedPassword, name });
    res.json({
      status: "Success",
      firstName: user.name.split(" ")[0] ? user.name.split(" ")[0] : user.name,
      id: user.id,
      token: generateToken(user.id),
    });
  } catch (error) {
    return next(new AppErr(error.message, 500));
  }
};

const loginController = async (req, res, next) => {
  const { phone, password } = req.body;
  try {
    const userFound = User.findOne({ phone });
    if (!userFound) {
      next(new AppErr("Invalid Login Credentials", 400));
    }
    const passwordMatch = await bcrypt.compare(password, userFound.password);
    if (!passwordMatch) {
      next(new AppErr("Invalid Login Credentials", 400));
    }
    res.json({
      status: "Success",
      firstName: userFound.name.split(" ")[0]
        ? userFound.name.split(" ")[0]
        : userFound.name,
      id: userFound.id,
      lastName: userFound.name.split(" ")[1]
        ? userFound.name.split(" ")[1]
        : " ",
      phone: userFound.phone,
      token: generateToken(userFound.id),
      ClothingItems: userFound.ClothingItems,
      Outfits: userFound.Outfits,
    });
  } catch (error) {
    next(new AppErr(error.message), 500);
  }
};

module.exports = { registerController, loginController };
