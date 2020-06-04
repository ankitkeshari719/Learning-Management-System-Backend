const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;

db.user = require("./user.model");
db.role = require("./role.model");
db.lesson = require("./lesson.model");
db.course = require("./course.model");

db.ROLES = ["student", "instructor", "admin"];

module.exports = db;