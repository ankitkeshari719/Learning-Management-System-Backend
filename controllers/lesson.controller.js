const Lesson = require("../models/lesson.model");

// Get all Lessons && Find all Lessons which name contains 'kw'
// http://localhost:8080/api/v1/Lessons?name=[Sachin]
exports.getAllLesson = (req, res) => {
  const name = req.query.name;
  let condition = name
    ? {
        name: {
          $regex: new RegExp(name),
          $options: "i",
        },
      }
    : {};
  Lesson.find(condition)
    .then((data) => {
      if (!data)
        res.status(404).send({
          status: "error",
          status_code: 404,
          success: false,
          error: true,
          message: "Not found Lesson ",
        });
      else {
        res.json({
          status: "success",
          status_code: 200,
          success: true,
          error: false,
          data: data,
          message: "All Lessons!! ",
        });
      }
    })
    .catch((error) => {
      res.status(500).send({
        status: "error",
        status_code: 500,
        success: false,
        error: true,
        message:
          error.message || "Some error occurred while retrieving Lessons.",
      });
    });
};

// Retrieve a single Lesson
exports.getLesson = (req, res) => {
  const id = req.params.id;
  Lesson.findById(id)
    .then((data) => {
      if (!data)
        res.status(404).send({
          status: "error",
          status_code: 404,
          success: false,
          error: true,
          message: "Not found Lesson with id " + id,
        });
      else {
        res.json({
          status: "success",
          status_code: 200,
          success: true,
          error: false,
          data: data,
          message: "Single Lessons!! ",
        });
      }
    })
    .catch((error) => {
      res.status(500).send({
        status: "error",
        status_code: 500,
        success: false,
        error: true,
        message: error.message || "Error retrieving Lesson with id=" + id,
      });
    });
};

// Add a new Lesson
exports.addLesson = (req, res) => {
  const { name } = req.body;
  let lesson = new Lesson({
    name: name,
    createdAt: Date.now(),
  });
  lesson
    .save(lesson)
    .then((data) => {
      if (!data)
        res.status(404).send({
          status: "error",
          status_code: 404,
          success: false,
          error: true,
          message: "Not found Lesson with id " + id,
        });
      else {
        res.json({
          status: "success",
          status_code: 200,
          success: true,
          error: false,
          data: data,
          message: "New Lesson Added Successfully!! ",
        });
      }
    })
    .catch((error) => {
      res.status(500).send({
        status: "error",
        status_code: 500,
        success: false,
        error: true,
        message:
          error.message || " Some error occurred while retrieving users.",
      });
    });
};

// Update th lesson
exports.updateLesson = (req, res) => {
  if (!req.body) {
    return res.status(404).send({
      status: "error",
      status_code: 404,
      success: false,
      error: true,
      message: "Data to update can not be empty!",
    });
  }

  const id = req.params.id;
  Lesson.findByIdAndUpdate(id, req.body, {
    useFindAndModify: false,
  })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          status: "error",
          status_code: 404,
          success: false,
          error: true,
          message: `Cannot update Lesson with id=${id}. Maybe Lesson was not found!`,
        });
      } else
        res.json({
          status: "success",
          status_code: 200,
          success: true,
          error: false,
          data: data,
          message: "Lesson was updated successfully.",
        });
    })
    .catch((error) => {
      res.status(500).send({
        status: "error",
        status_code: 500,
        success: false,
        error: true,
        message: error.message || "Error updating Lesson with id=" + id,
      });
    });
};

// Delete the lesson
exports.deleteLesson = (req, res) => {
  const id = req.params.id;

  Lesson.findByIdAndRemove(id)
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Lesson with id=${id}. Maybe Lesson was not found!`,
        });
      } else {
        res.json({
          status: "success",
          status_code: 200,
          success: true,
          error: false,
          data: data,
          message: "Lesson was deleted successfully!",
        });
      }
    })
    .catch((error) => {
      res.status(500).send({
        status: "error",
        status_code: 500,
        success: false,
        error: true,
        message: error.message || "Could not delete Lesson with id=" + id,
      });
    });
};

// Delete all the lesson
exports.deleteLessonAll = (req, res) => {
  Lesson.deleteMany({})
    .then((data) => {
      res.json({
        status: "success",
        status_code: 200,
        success: true,
        error: false,
        data: data,
        message: `${data.deletedCount} Lesson were deleted successfully!`,
      });
    })
    .catch((error) => {
      res.status(500).send({
        status: "error",
        status_code: 500,
        success: false,
        error: true,
        message:
          error.message || "Some error occurred while removing all Lesson.",
      });
    });
};
