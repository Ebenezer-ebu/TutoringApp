const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;

db.user = require("./user");
db.role = require("./role");
db.category = require("./category")

db.ROLES = ["admin", "tutor", "student"];
db.CATEGORY = ["primary", "JSS", "SSS"];

module.exports = db;