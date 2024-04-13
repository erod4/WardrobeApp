const mongoose = require("mongoose");

const outfitsSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    items: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "ClothingItem",
      },
    ],
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true, // Automatically create `createdAt` and `updatedAt` fields
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

const Outfits = mongoose.model("Outfits", outfitsSchema);

module.exports = Outfits;
