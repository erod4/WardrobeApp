const {
  createClothingItem,
  getClothingItems,
  getClothingItemById,
  updateClothingItem,
  deleteClothingItem,
} = require("../../Controllers/WardrobeController/ClothingItemController");
const express = require("express");
const clothingItemRoute = express.Router();

clothingItemRoute.post("/", createClothingItem);
clothingItemRoute.get("/", getClothingItems);
clothingItemRoute.get("/:id", getClothingItemById);

clothingItemRoute.put("/:id", updateClothingItem);
clothingItemRoute.delete("/:id", deleteClothingItem);
module.exports = clothingItemRoute;
