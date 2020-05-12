var mongoose = require("mongoose");

var Category = mongoose.model(
  "Category",
  new mongoose.Schema({
    title: String,
    subject: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Subject"
      }
    ]  
  }, {timestamps: true})
);

module.exports = Category;