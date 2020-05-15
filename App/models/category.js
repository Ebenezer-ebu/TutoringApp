var mongoose = require("mongoose");

var Category = mongoose.model(
  "Category",
  new mongoose.Schema({
    title: String,
  }, {timestamps: true})
);

module.exports = Category;