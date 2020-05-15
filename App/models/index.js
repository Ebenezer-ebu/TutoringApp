const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;

db.user = require("./user");
db.role = require("./role");
db.subject = require("./subject");
db.lesson = require("./lesson");
db.category = require("./category");

db.ROLES = ["admin", "tutor", "user"];
db.CATEGORY = ["primary", "JSS", "SSS"];

module.exports = db;