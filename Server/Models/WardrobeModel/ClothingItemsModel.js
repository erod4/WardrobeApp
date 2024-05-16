const mongoose = require("mongoose");

const clothingItemSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    category: {
      type: String,
      required: true,
      trim: true,
      lowercase: true, // Consider using lowercase for easier categorization
      enum: [
        "jackets",
        "t-shirts",
        "shirts",
        "pants",
        "shorts",
        "hats",
        "socks",
        "shoes",
      ], // Example categories
    },
    imageURL: {
      type: String,
      required: false, // Depending on your app, you might not require an image immediately upon creation
      trim: true,
    },

    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Assuming you have a User model to link each item to a user
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
  }
);

const ClothingItem = mongoose.model("ClothingItem", clothingItemSchema);

module.exports = ClothingItem;
