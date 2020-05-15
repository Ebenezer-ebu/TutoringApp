const mongoose = require("mongoose");

const Lesson = mongoose.model(
  "Lesson",
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

module.exports = Lesson;