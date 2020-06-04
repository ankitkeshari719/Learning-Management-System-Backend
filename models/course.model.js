const mongoose = require("mongoose");

//. create a schema for Course collection
const courseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  oneLiner: {
    type: String,
    required: true,
  },
  duration: {
    type: String,
    required: true,
  },
  language: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  lessons: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Lesson",
    },
  ],
  photo: {
    type: String,
    required: true,
  },
});

//4. create a model for Course collection
const Course = mongoose.model("Course", courseSchema, "Courses");

module.exports = Course;
