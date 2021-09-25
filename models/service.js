const mongoose = require("mongoose");

const serviceSchema = new mongoose.Schema({
  id: { type: String, required: true },
  name: { type: String, required: true },
  price: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String },
});

module.exports = Service = mongoose.model("Service", serviceSchema);
