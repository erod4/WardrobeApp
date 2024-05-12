const express = require("express");
const OutfitsRoute = express.Router();
const {
  createOutfit,
  getOutfits,
  getOutfitById,
  updateOutfit,
  deleteOutfit,
} = require("../../Controllers/WardrobeController/OutfitsController");
const isLoggedIn = require("../../Middleware/isLoggedIn");
OutfitsRoute.post("/", isLoggedIn, createOutfit);
OutfitsRoute.get("/", isLoggedIn, getOutfits);
OutfitsRoute.get("/:id", isLoggedIn, getOutfitById);

OutfitsRoute.put("/", isLoggedIn, updateOutfit);
OutfitsRoute.delete("/", isLoggedIn, deleteOutfit);
module.exports = OutfitsRoute;
