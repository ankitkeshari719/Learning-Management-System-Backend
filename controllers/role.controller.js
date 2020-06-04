const Role = require("../models/role.model");

// Get all Roles && Find all Roles which name contains 'kw'
// http://localhost:8080/api/v1/Roles?name=[Sachin]
exports.getAllRole = (req, res) => {
  const name = req.query.name;
  let condition = name
    ? {
        name: {
          $regex: new RegExp(name),
          $options: "i",
        },
      }
    : {};
  Role.find(condition)
    .then((data) => {
      if (!data)
        res.status(404).send({
          status: "error",
          status_code: 404,
          success: false,
          error: true,
          message: "Not found Role ",
        });
      else {
        res.json({
          status: "success",
          status_code: 200,
          success: true,
          error: false,
          data: data,
          message: "All Roles!! ",
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
          error.message || "Some error occurred while retrieving roles.",
      });
    });
};

// Retrieve a single Role
exports.getRole = (req, res) => {
  const id = req.params.id;
  Role.findById(id)
    .then((data) => {
      if (!data)
        res.status(404).send({
          status: "error",
          status_code: 404,
          success: false,
          error: true,
          message: "Not found role with id " + id,
        });
      else {
        res.json({
          status: "success",
          status_code: 200,
          success: true,
          error: false,
          data: data,
          message: "Single Role!! ",
        });
      }
    })
    .catch((error) => {
      res.status(500).send({
        status: "error",
        status_code: 500,
        success: false,
        error: true,
        message: error.message || "Error retrieving role with id=" + id,
      });
    });
};

// Add a new Role
exports.addRole = (req, res) => {
  const { name } = req.body;
  let role = new Role({
    name: name
  });
  role
    .save(role)
    .then((data) => {
      if (!data)
        res.status(404).send({
          status: "error",
          status_code: 404,
          success: false,
          error: true,
          message: "Not found role with id " + id,
        });
      else {
        res.json({
          status: "success",
          status_code: 200,
          success: true,
          error: false,
          data: data,
          message: "New role Added Successfully!! ",
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

// Update th Role
exports.updateRole = (req, res) => {
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
  Role.findByIdAndUpdate(id, req.body, {
    useFindAndModify: false,
  })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          status: "error",
          status_code: 404,
          success: false,
          error: true,
          message: `Cannot update role with id=${id}. Maybe role was not found!`,
        });
      } else
        res.json({
          status: "success",
          status_code: 200,
          success: true,
          error: false,
          data: data,
          message: "Role was updated successfully.",
        });
    })
    .catch((error) => {
      res.status(500).send({
        status: "error",
        status_code: 500,
        success: false,
        error: true,
        message: error.message || "Error updating Role with id=" + id,
      });
    });
};

// Delete the Role
exports.deleteRole = (req, res) => {
  const id = req.params.id;

  Role.findByIdAndRemove(id)
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete role with id=${id}. Maybe role was not found!`,
        });
      } else {
        res.json({
          status: "success",
          status_code: 200,
          success: true,
          error: false,
          data: data,
          message: "Role was deleted successfully!",
        });
      }
    })
    .catch((error) => {
      res.status(500).send({
        status: "error",
        status_code: 500,
        success: false,
        error: true,
        message: error.message || "Could not delete Role with id=" + id,
      });
    });
};

// Delete all the Role
exports.deleteRoleAll = (req, res) => {
  Role.deleteMany({})
    .then((data) => {
      res.json({
        status: "success",
        status_code: 200,
        success: true,
        error: false,
        data: data,
        message: `${data.deletedCount} Role were deleted successfully!`,
      });
    })
    .catch((error) => {
      res.status(500).send({
        status: "error",
        status_code: 500,
        success: false,
        error: true,
        message:
          error.message || "Some error occurred while removing all Role.",
      });
    });
};
