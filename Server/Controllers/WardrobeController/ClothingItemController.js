const uploadToS3 = require("../../Config/AWS/S3");
const sendImage = require("../../Config/ImgProcessing/ImgProc");
const createClothingItem = async (req, res) => {
  try {
    const file = req.file;
    if (!file) {
      //add error handler
    }
    buffer = await sendImage(file);
    uploadToS3(file, buffer, "123");
  } catch (error) {
    console.error("create clothint item ", error);
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

const updateClothingItem = async () => {
  try {
  } catch (error) {}
};

const deleteClothingItem = async () => {
  try {
  } catch (error) {}
};

module.exports = {
  createClothingItem,
  getClothingItems,
  getClothingItemById,
  updateClothingItem,
  deleteClothingItem,
};
