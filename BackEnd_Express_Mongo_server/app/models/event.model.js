const mongoose = require("mongoose");

const EventSchema = mongoose.Schema({
  title: { type: String, unique: true, lowercase: true },
  domain: String,
  price: Number,
  location: String,
  startDate: String,
  photoPath: String,
  endDate: String,
  description: String,
  organizerName: String,
});

module.exports = mongoose.model("Event", EventSchema);
