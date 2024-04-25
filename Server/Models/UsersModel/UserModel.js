const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    resetCode: {
      type: String,
    },
    resetCodeExpiration: {
      type: Date,
    },
    password: { type: String, required: true },
    clothingItems: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "ClothingItem",
      },
    ],
    Outfits: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Outfits",
      },
    ],
  },

  {
    timestamps: true,
    toJSON: { virtuals: true },
  }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
