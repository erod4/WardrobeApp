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
clothingItemRoute.post("/", upload.single("image"), createClothingItem);
clothingItemRoute.get("/", upload.single("image"), getClothingItems);
clothingItemRoute.get("/:id", upload.single("image"), getClothingItemById);

clothingItemRoute.put("/:id", upload.single("image"), updateClothingItem);
clothingItemRoute.delete("/:id", upload.single("image"), deleteClothingItem);
module.exports = clothingItemRoute;
