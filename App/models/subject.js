const mongoose = require("mongoose");

const Subject = mongoose.model(
  "Subject",
  new mongoose.Schema({
    name: String,
    category: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category"
      }
    ]
  })
);

module.exports = Subject;