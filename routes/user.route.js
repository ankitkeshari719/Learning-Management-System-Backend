const express = require('express')
const router = express.Router()

const { authJwt } = require("../middleware");
const userController = require('../controllers/user.controller')

router.get('/', [authJwt.verifyToken], userController.getAllUser);
router.get('/:id', [authJwt.verifyToken], userController.getUser);
router.put('/:id', [authJwt.verifyToken], userController.updateUser);
router.delete('/:id', [authJwt.verifyToken], userController.deleteUser);
router.delete('/', [authJwt.verifyToken], userController.deleteUserAll);

module.exports = router