const mongoose = require("mongoose");

//. create a schema for Lesson collection
const lessonSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
  },
});

//4. create a model for Lesson collection
const Lesson = mongoose.model("Lesson", lessonSchema, "Lessons");

module.exports = Lesson;
