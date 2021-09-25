const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema(
  {
    Name: [
      {
        type: String,
        trim: true,
        require: true,
      },
    ],
    Price: [
      {
        type: String,
        trim: true,
        require: true,
      },
    ],
    Quanity: [
      {
        type: String,
        trim: true,
        require: true,
      },
    ],
    Total: {
      type: String,
      trim: true,
      require: true,
    },
    PName: {
      type: String,
      trim: true,
      require: true,
    },
    Email: {
      type: String,
      trim: true,
      require: true,
    },
    Phone: {
      type: String,
      trim: true,
      require: true,
    },
    Address: {
      type: String,
      trim: true,
      require: true,
    },
    Special: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("oder", cartSchema);
