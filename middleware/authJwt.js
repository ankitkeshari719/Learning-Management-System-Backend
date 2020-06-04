const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");
const db = require("../models");
const User = db.user;
const Role = db.role;

verifyToken = (req, res, next) => {
  let token = req.headers["x-access-token"];

  if (!token) {
    return res.status(403).send({
      status: "error",
      status_code: 403,
      success: false,
      error: true,
      message: "No token provided!",
    });
  }

  jwt.verify(token, config.secret, (error, decoded) => {
    if (error) {
      return res.status(401).send({
        status: "error",
        status_code: 401,
        success: false,
        error: true,
        message: "Unauthorized",
      });
    }
    req.userId = decoded.id;
    next();
  });
};

isAdmin = (req, res, next) => {
  User.findById(req.userId).exec((error, user) => {
    if (error) {
      return res.status(500).send({
        status: "error",
        status_code: 500,
        success: false,
        error: true,
        message: error,
      });

    }

    Role.find(
      {
        _id: { $in: user.type },
      },
      (error, type) => {
        if (error) {
          return res.status(500).send({
            status: "error",
            status_code: 500,
            success: false,
            error: true,
            message: error,
          });
        }

        for (let i = 0; i < type.length; i++) {
          if (type[i].name === "admin") {
            next();
            return;
          }
        }
        return res.status(403).send({
          status: "error",
          status_code: 403,
          success: false,
          error: true,
          message: "Require Admin Role!",
        });
      }
    );
  });
};

isInstructor = (req, res, next) => {
  User.findById(req.userId).exec((error, user) => {
    if (error) {
      return res.status(500).send({
        status: "error",
        status_code: 500,
        success: false,
        error: true,
        message: error,
      });

    }

    Role.find(
      {
        _id: { $in: user.type },
      },
      (error, type) => {
        if (error) {
          return res.status(500).send({
            status: "error",
            status_code: 500,
            success: false,
            error: true,
            message: error,
          });

        }

        for (let i = 0; i < type.length; i++) {
          if (type[i].name === "instructor") {
            next();
            return;
          }
        }

        return res.status(403).send({
          status: "error",
          status_code: 403,
          success: false,
          error: true,
          message: "Require Instructor Role!",
        });
      }
    );
  });
};

const authJwt = {
  verifyToken,
  isAdmin,
  isInstructor,
};
module.exports = authJwt;
