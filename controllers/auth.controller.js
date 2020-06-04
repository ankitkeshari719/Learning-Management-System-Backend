const config = require("../config/auth.config");
const db = require("../models");
const User = db.user;
const Role = db.role;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

// Sign Up
exports.signup = (req, res) => {
  const { name, type, emailId, password } = req.body;

  const user = new User({
    name: name,
    emailId: emailId,
    password: bcrypt.hashSync(password, 8),
  });

  user.save((error, user) => {
    if (error) {
      return res.status(500).send({
        status: "error",
        status_code: 500,
        success: false,
        error: true,
        message: error.message || "Some error occurred while signup user!! ",
      });
    }
    Role.find(
      {
        name: {
          $in: req.body.type,
        },
      },
      (error, type) => {
        if (error) {
          return res.status(500).send({
            status: "error",
            status_code: 500,
            success: false,
            error: true,
            message:
              error.message || "Some error occurred while signup user!! ",
          });
        }

        user.type = type.map((role) => role._id);
        user.save((error) => {
          if (error) {
            return res.status(500).send({
              status: "error",
              status_code: 500,
              success: false,
              error: true,
              message:
                error.message || "Some error occurred while signup user!! ",
            });
          }
          return res.json({
            status: "success",
            status_code: 200,
            success: true,
            error: false,
            data: [],
            message: "User was registered successfully!",
          });
        });
      }
    );
  });
};

// Sign In
exports.signin = (req, res) => {
  User.findOne({
    emailId: req.body.emailId,
  })
    .populate("type", "-__v")
    .exec((error, user) => {
      if (error) {
        return res.status(500).send({
          status: "error",
          status_code: 500,
          success: false,
          error: true,
          message: error.message || "Some error occurred while signin user!! ",
        });
      }

      if (!user) {
        return res.status(401).send({
          status: "error",
          status_code: 404,
          success: false,
          error: true,
          message: "User Not found.",
        });
      }

      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );

      if (!passwordIsValid) {
        return res.status(401).send({
          status: "error",
          status_code: 401,
          success: false,
          error: true,
          message: "Invalid Password!",
          accessToken: null,
        });
      }

      var token = jwt.sign(
        {
          id: user.id,
        },
        config.secret,
        {
          expiresIn: 86401, // 24 hours
        }
      );

      var authorities = [];
      for (let i = 0; i < user.type.length; i++) {
        authorities.push("ROLE_" + user.type[i].name.toUpperCase());
      }
      return res.status(200).send({
        id: user._id,
        name: user.name,
        emailId: user.emailId,
        type: authorities,
        accessToken: token,
      });
    });
};
