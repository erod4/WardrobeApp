const User = require("../../Models/UsersModel/UserModel");
const AppErr = require("../../Utils/AppError");
const bcrypt = require("bcrypt");
const generateToken = require("../../Utils/genToken");

const registerController = async (req, res, next) => {
  console.log(req.body);
  const { phone, name, password } = req.body;

  try {
    const userFound = await User.findOne({ phone });
    if (userFound) {
      return next(new AppErr("Phone Number In Use", 400));
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({ phone, password: hashedPassword, name });
    console.log(user.id);
    res.json({
      status: "Success",
      firstName: user.name.split(" ")[0] ? user.name.split(" ")[0] : user.name,
      id: user.id,
      token: generateToken(user.id),
    });
  } catch (error) {
    // console.log(error);
    return next(new AppErr(error.message, 500));
  }
};

const loginController = async (req, res, next) => {
  console.table(req.body);
  const { phone, password } = req.body;
  try {
    const userFound = await User.findOne({ phone });
    if (!userFound) {
      return next(new AppErr("Invalid Login Credentials", 400));
    }
    const passwordMatch = await bcrypt.compare(password, userFound.password);
    if (!passwordMatch) {
      return next(new AppErr("Invalid Login Credentials", 400));
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
      ClothingItems: userFound.clothingItems,
      Outfits: userFound.Outfits,
    });
  } catch (error) {
    return next(new AppErr(error.message, 500));
  }
};
const getUserController = async (req, res, next) => {
  const id = req.user;
  try {
    const userFound = await User.findById(id)
      .populate({ path: "clothingItems", model: "ClothingItem" })
      .populate({ path: "Outfits", model: "Outfits" });

    res.json(userFound);
  } catch (error) {
    return next(new AppErr(error.message, 500));
  }
};
module.exports = { registerController, loginController, getUserController };
