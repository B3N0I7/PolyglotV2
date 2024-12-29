const mongoose = require("mongoose");

const wordSchema = new mongoose.Schema(
  {
    englishWord: {
      type: String,
      required: true,
    },
    frenchWord: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: false,
    },
    difficulty: {
      type: String,
      required: false,
    },
    creationDate: {
      type: Date,
      default: Date.UTC,
    },
  },
  { collection: "GlobalDictionary" }
);
const Words = mongoose.model("GlobalDictionary", wordSchema);

module.exports = Words;
