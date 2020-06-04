const User = require("../models/user.model");

// Get all users && Find all users which name contains 'kw'
// http://localhost:8080/api/v1/users?name=[Sachin]
exports.getAllUser = (req, res) => {
  const name = req.query.name;
  let condition = name
    ? {
        name: {
          $regex: new RegExp(name),
          $options: "i",
        },
      }
    : {};
  User.find(condition)
    .populate("type", "name")
    .then((data) => {
      if (!data)
        res.status(404).send({
          status: "error",
          status_code: 404,
          success: false,
          error: true,
          message: "Not found User!! ",
        });
      else {
        res.json({
          status: "success",
          status_code: 200,
          success: true,
          error: false,
          data: data,
          message: "All Users!! ",
        });
      }
    })
    .catch((error) => {
      res.status(500).send({
        status: "error",
        status_code: 500,
        success: false,
        error: true,
        message: error.message || "Some error occurred while retrieving Users.",
      });
    });
};

// Retrieve a single user
exports.getUser = (req, res) => {
  const id = req.params.id;
  User.findById(id)
    .then((data) => {
      if (!data)
        res.status(404).send({
          status: "error",
          status_code: 404,
          success: false,
          error: true,
          message: "Not found User with id " + id,
        });
      else {
        res.json({
          status: "success",
          status_code: 200,
          success: true,
          error: false,
          data: data,
          message: "Single Users!! ",
        });
      }
    })
    .catch((error) => {
      res.status(500).send({
        status: "error",
        status_code: 500,
        success: false,
        error: true,
        message: error.message || "Error retrieving User with id=" + id,
      });
    });
};

// Update the user
exports.updateUser = (req, res) => {
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
  User.findByIdAndUpdate(id, req.body, {
    useFindAndModify: false,
  })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          status: "error",
          status_code: 404,
          success: false,
          error: true,
          message: `Cannot update User with id=${id}. Maybe User was not found!`,
        });
      } else
        res.json({
          status: "success",
          status_code: 200,
          success: true,
          error: false,
          data: data,
          message: "User was updated successfully.",
        });
    })
    .catch((error) => {
      res.status(500).send({
        status: "error",
        status_code: 500,
        success: false,
        error: true,
        message: error.message || "Error updating User with id=" + id,
      });
    });
};

// Delete a user
exports.deleteUser = (req, res) => {
  const id = req.params.id;

  User.findByIdAndRemove(id)
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete User with id=${id}. Maybe User was not found!`,
        });
      } else {
        res.json({
          status: "success",
          status_code: 200,
          success: true,
          error: false,
          data: data,
          message: "User was deleted successfully!",
        });
      }
    })
    .catch((error) => {
      res.status(500).send({
        status: "error",
        status_code: 500,
        success: false,
        error: true,
        message: error.message || "Could not delete User with id=" + id,
      });
    });
};

// Delete all the user
exports.deleteUserAll = (req, res) => {
  User.deleteMany({})
    .then((data) => {
      res.json({
        status: "success",
        status_code: 200,
        success: true,
        error: false,
        data: data,
        message: `${data.deletedCount} User were deleted successfully!`,
      });
    })
    .catch((error) => {
      res.status(500).send({
        status: "error",
        status_code: 500,
        success: false,
        error: true,
        message:
          error.message || "Some error occurred while removing all User.",
      });
    });
};
