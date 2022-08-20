const mongoose = require("mongoose");

const DishSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      maxlength: 25,
      unique: true,
    },
    description: {
      type: String,
      required: true,
      maxlength: 200,
    },
    price: {
      type: Number,
      required: true,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    photo: {
      data: Buffer,
      contentType: String,
    },
    addedBy: {
      type: String,
      required: true,
    },
    __v: {
      type: Number,
      select: false,
    },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("Dish", DishSchema);
