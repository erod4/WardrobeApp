const { uploadToS3, deleteFromS3 } = require("../../Config/AWS/S3");
const sendImage = require("../../Config/ImgProcessing/ImgProc");
const User = require("../../Models/UsersModel/UserModel");
const ClothingItem = require("../../Models/WardrobeModel/ClothingItemsModel");
const AppErr = require("../../Utils/AppError");

const createClothingItem = async (req, res, next) => {
  try {
    const { name, category } = req.body;
    //get user id from req
    const id = req.user;
    //get user from db using id
    const user = await User.findById(id);
    if (!user) {
      next(new AppErr("User Not Found", 400));
    }
    //
    const file = req.file;
    if (!file) {
      next(new AppErr("Image Not Provided", 400));
    }
    //send image sends image to python server to remove background
    buffer = await sendImage(file);
    //upload image to s3 bucket and get back response and img
    const { data, url } = await uploadToS3(file, buffer, id);
    //add url to users clothing items
    const clothing_item = await ClothingItem.create({
      name,
      category,
      imageURL: url,
      userId: id,
    });
    user.clothingItems.push(clothing_item.id);
    await user.save();
    //respond to client with success code

    res.json({ status: "Success", data: clothing_item });
  } catch (error) {
    next(new AppErr(error.message, 500));
  }
};

const getClothingItems = async () => {
  try {
  } catch (error) {}
};
const getClothingItemById = async () => {
  try {
  } catch (error) {}
};

const updateClothingItem = async (req, res, next) => {
  const { cloth_id, name, category } = req.body;
  let buffer = null;
  let url = null;

  try {
    const id = req.user;
    const userFound = User.findById(id);
    if (!userFound) {
      next(new AppErr("User Not Found", 400));
    }
    if (!cloth_id) {
      next(new AppErr("Clothing Item Not Found", 400));
    }
    //find clothing item
    const item = await ClothingItem.findById(cloth_id);
    if (!item) {
      next(new AppErr("Clothing Item Not Found", 400));
    }
    //check for fields we want to update
    const updateFields = {};
    if (name) {
      updateFields["name"] = name;
    }
    const file = req.file;

    if (file) {
      const key = item.imageURL;
      //delete image from s3 bucket
      const image_data = await deleteFromS3(key);
      if (image_data.$metadata.httpStatusCode != 204) {
        next(new AppErr("S3 Bucket Delete Unsucessful", 500));
      }
      //remove background of image
      buffer = await sendImage(file);
      //upload image to s3 bucket and get back response and img
      const res = await uploadToS3(file, buffer, id);
      url = res.url;
    }
    if (url) {
      updateFields["imageURL"] = url;
    }
    if (category) {
      updateFields["category"] = category;
    }

    //update items (name,url,category)
    const updated_item = await ClothingItem.findByIdAndUpdate(
      cloth_id,
      updateFields,
      {
        new: true,
        runValidators: true,
      }
    );
    res.json({ status: "Success", data: updated_item });
  } catch (error) {
    next(new AppErr(error.message, 500));
  }
};

const deleteClothingItem = async (req, res, next) => {
  const { cloth_id } = req.body;
  try {
    const id = req.user;
    const userFound = await User.findById(id);
    if (!userFound) {
      next(new AppErr("User Not Found", 400));
    }
    if (!cloth_id) {
      next(new AppErr("Clothing Item Not Found", 400));
    }
    //delete image from s3
    const item = await ClothingItem.findById(cloth_id);

    const key = item.imageURL;

    const image_data = await deleteFromS3(key);
    if (image_data.$metadata.httpStatusCode != 204) {
      next(new AppErr("S3 Bucket Delete Unsucessful", 500));
    }
    //delete image from db
    const deletedItem = await ClothingItem.findByIdAndDelete(cloth_id);
    userFound.clothingItems = userFound.clothingItems.filter(
      (id) => id.toString() !== cloth_id
    );
    console.log(userFound.clothingItems);
    await userFound.save();
    //respond
    res.json({ status: "Success" });
  } catch (error) {
    next(new AppErr(error.message, 500));
  }
};

module.exports = {
  createClothingItem,
  getClothingItems,
  getClothingItemById,
  updateClothingItem,
  deleteClothingItem,
};
