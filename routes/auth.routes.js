const express = require('express')
const router = express.Router()

const { verifySignUp } = require("../middleware");
const authController = require("../controllers/auth.controller");

router.post("/signup",  [
      verifySignUp.checkDuplicateUsernameOrEmail,
      verifySignUp.checkRolesExisted
    ],
    authController.signup
);

router.post("/signin",  authController.signin );

module.exports = router;