const User = require("../../Models/UsersModel/UserModel");
const Outfits = require("../../Models/WardrobeModel/OutfitsModel");
const AppErr = require("../../Utils/AppError");

const createOutfit = async (req, res, next) => {
  try {
    //extract user id
    const id = req.user;
    const { items, name, description } = req.body;
    //if no ids provided to create outfit, then throw error
    if (items.length == 0) {
      next(new AppErr("No Outfit Items Provided", 400));
    }
    //make new outfit
    const outfit = await Outfits.create({
      name,
      description,
      userId: id,
    });
    if (!outfit) {
      next(new AppErr("Outfit Creation Failed", 500));
    }
    //add clothing item ids to outfit
    outfit.items.push(...items);
    await outfit.save();
    //add outfit to user
    const userFound = await User.findById(id);
    if (!userFound) {
      next(new AppErr("User Not Found", 400));
    }
    userFound.Outfits.push(outfit);
    await userFound.save();

    res.json({ status: "Success" });
  } catch (error) {
    next(new AppErr(error.message, 500));
  }
};

const getOutfits = async () => {
  try {
  } catch (error) {}
};
const getOutfitById = async () => {
  try {
  } catch (error) {}
};

const updateOutfit = async (req, res, next) => {
  const id = req.user;
  const { outfit_id, old_items, new_items, name, description } = req.body;
  try {
    const outfit = await Outfits.findById(outfit_id);

    if (!outfit) {
      next(new AppErr("No Outfit Provided", 400));
    }

    updates = {};
    if (name) {
      updates["name"] = name;
    }
    if (description) {
      updates["description"] = description;
    }
    if (old_items && new_items) {
      old_items.forEach((item) => {
        outfit.items = outfit.items.filter(
          (id) => id.toString() !== item.toString()
        );
      });
      new_items.forEach((item) => {
        outfit.items.push(mongoose.Types.ObjectId(item));
      });
      await outfit.save();
    }
    Outfits.findByIdAndUpdate(outfit_id, updates, {
      new: true,
      runValidators: true,
    });
    res.json({ status: "Success" });
  } catch (error) {
    next(new AppErr(error.message, 500));
  }
};

const deleteOutfit = async (req, res, next) => {
  const id = req.user;
  const { outfit_id } = req.body;
  console.log(outfit_id);
  try {
    if (!outfit_id) {
      next(new AppErr("No Outfit Provided", 400));
    }
    await Outfits.findByIdAndDelete(outfit_id);
    const userFound = await User.findById(id);
    if (!userFound) {
      next(new AppErr("No User Found", 400));
    }

    userFound.Outfits = userFound.Outfits.filter(
      (id) => id.toString() !== outfit_id
    );
    await userFound.save();
    res.json({ status: "Success", data: userFound });
  } catch (error) {
    next(new AppErr(error.message, 500));
  }
};

module.exports = {
  createOutfit,
  getOutfits,
  getOutfitById,
  updateOutfit,
  deleteOutfit,
};
