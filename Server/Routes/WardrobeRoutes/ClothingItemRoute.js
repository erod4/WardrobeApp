const {
  createClothingItem,
  getClothingItems,
  getClothingItemById,
  updateClothingItem,
  deleteClothingItem,
} = require("../../Controllers/WardrobeController/ClothingItemController");
const express = require("express");
const clothingItemRoute = express.Router();
const upload = require("../../Config/PhotoManagement/Multer");
const isLoggedIn = require("../../Middleware/isLoggedIn");
clothingItemRoute.post(
  "/",
  isLoggedIn,
  upload.single("image"),
  createClothingItem
);
clothingItemRoute.get(
  "/",
  isLoggedIn,
  upload.single("image"),
  getClothingItems
);
clothingItemRoute.get(
  "/:id",
  isLoggedIn,
  upload.single("image"),
  getClothingItemById
);

clothingItemRoute.put(
  "/",
  isLoggedIn,
  upload.single("image"),
  updateClothingItem
);
clothingItemRoute.delete(
  "/",
  isLoggedIn,
  upload.single("image"),
  deleteClothingItem
);
module.exports = clothingItemRoute;
