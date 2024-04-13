const express = require("express");
const OutfitsRoute = express.Router();
const {
  createOutfit,
  getOutfits,
  getOutfitById,
  updateOutfit,
  deleteOutfit,
} = require("../../Controllers/WardrobeController/OutfitsController");
OutfitsRoute.post("/", createOutfit);
OutfitsRoute.get("/", getOutfits);
OutfitsRoute.get("/:id", getOutfitById);

OutfitsRoute.put("/:id", updateOutfit);
OutfitsRoute.delete("/:id", deleteOutfit);
module.exports = OutfitsRoute;
