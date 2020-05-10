var mongoose = require("mongoose");

var User = mongoose.model(
  "User",
  new mongoose.Schema({
    username: String,
    email: String,
    password: String,
    roles: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Role"
      }
    ],
    category: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Category"
        }
      ]
  })
);

module.exports = User;