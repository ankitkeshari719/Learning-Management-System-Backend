const db = require("../models");

const createCourse = function (Course) {
  return db.course.create(Course).then((docCourse) => {
    return docCourse;
  });
};

const createLesson = function (courseId, lesson) {
  return db.lesson.create(lesson).then((docLesson) => {
    return db.course.findByIdAndUpdate(
      courseId,
      {
        $push: {
          lessons: docLesson._id,
        },
      },
      {
        new: true,
        useFindAndModify: false,
      }
    );
  });
};

// Add a new Course
exports.addCourse = async (req, res) => {
  let {
    name,
    category,
    oneLiner,
    duration,
    language,
    description,
    lessons,
    photo,
  } = req.body;
  try {
    var course = await createCourse({
      name: name,
      category: category,
      oneLiner: oneLiner,
      duration: duration,
      language: language,
      description: description,
      lessons: lessons,
      photo: photo,
    });
    // if (!course) {
    //   res.status(404).send({
    //     message: "Error 404",
    //   });
    // } else {
    //   res.json({
    //     success: true,
    //     data: course,
    //     message: "New course is added successfully!! ",
    //   });
    // }
  } catch (error) {
    res.status(500).send({
      status: "error",
      status_code: 500,
      success: false,
      error: true,
      message: error.message || "Some error occurred while adding course!! ",
    });
  }
  try {
    course = await createLesson(course._id, {
      name: "Node",
      createdAt: Date.now(),
    });
    if (!course) {
      res.status(404).send({
        status: "error",
        status_code: 404,
        success: false,
        error: true,
        message: error.message || "Cannot add Course !!! ",
      });
    } else {
      res.json({
        status: "success",
        status_code: 200,
        success: true,
        error: false,
        data: course,
        message: "New course is added successfully!! ",
      });
    }
  } catch (error) {
    return res.status(500).send({
      status: "error",
      status_code: 500,
      success: false,
      error: true,
      data: course,
      message: error.message || "Some error occurred while adding course!! ",
    });
  }
};

exports.getCourse = async (req, res) => {
  const options = { _id: req.params.id };
  db.course
    .findOne(options)
    .populate("lessons", "name")
    .then((data) => {
      if (!data) {
        res.status(404).send({
          status: "error",
          status_code: 404,
          success: false,
          error: true,
          message: "Not found Course with id " + id,
        });
      } else {
        res.json({
          status: "success",
          status_code: 200,
          success: true,
          error: false,
          data: data,
          message: "Single Course!! ",
        });
      }
    })
    .catch((error) => {
      res.status(500).send({
        status: "error",
        status_code: 500,
        success: false,
        error: true,
        message: error.message || "Some error occurred while retrieving course.",
      });
    });
};

// Get all course
exports.getAllCourse = async (req, res) => {
  db.course
    .find()
    .populate("lessons", "name")
    .then((data) => {
      if (!data) {
        res.status(404).send({
          status: "error",
          status_code: 404,
          success: false,
          error: true,
          message: "Not Course found ",
        });
      } else {
        res.json({
          status: "success",
          status_code: 200,
          success: true,
          error: false,
          data: data,
          message: "All Course!! ",
        });
      }
    })
    .catch((error) => {
      res.status(500).send({
        status: "error",
        status_code: 500,
        success: false,
        error: true,
        message: error.message || "Some error occurred while retrieving course.",
      });
    });
};
