const db = require("../models");
const ROLES = db.ROLES;
const User = db.user;

// Function to Check Duplicate Name Or Email
checkDuplicateUsernameOrEmail = (req, res, next) => {
  // Name
  User.findOne({
    name: req.body.name,
  }).exec((error, user) => {
    if (error) {
      return res.status(500).send({
        status: "error",
        status_code: 500,
        success: false,
        error: true,
        message: error.message || "Some error occurred while signup!! ",
      });
    }

    if (user) {
      return res.status(404).send({
        status: "error",
        status_code: 404,
        success: false,
        error: true,
        message: "Failed! Name is already in use!",
      });
    }

    // Email
    User.findOne({
      email: req.body.email,
    }).exec((error, user) => {
      if (error) {
        return res.status(500).send({
          status: "error",
          status_code: 500,
          success: false,
          error: true,
          message: error.message || "Some error occurred while signup!! ",
        });
      }

      if (user) {
        return res.status(404).send({
          status: "error",
          status_code: 404,
          success: false,
          error: true,
          message: "Failed! Email is already in use!",
        });
      }
      next();
    });
  });
};

// Function to Check Role is valid or not
checkRolesExisted = (req, res, next) => {
  if (req.body.type) {
    for (let i = 0; i < req.body.type.length; i++) {
      if (!ROLES.includes(req.body.type[i])) {
        return res.status(404).send({
          status: "error",
          status_code: 404,
          success: false,
          error: true,
          message: `Failed! Role ${req.body.type[i]} does not exist!`,
        });
      }
    }
  }
  next();
};

const verifySignUp = {
  checkDuplicateUsernameOrEmail,
  checkRolesExisted,
};

module.exports = verifySignUp;
