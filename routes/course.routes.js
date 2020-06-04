const express = require('express')
const router = express.Router()

const { authJwt } = require("../middleware");
const courseController = require('../controllers/course.controller')

router.post('/', [authJwt.verifyToken], courseController.addCourse);
router.get('/', [authJwt.verifyToken], courseController.getAllCourse);
router.get('/:id', [authJwt.verifyToken], courseController.getCourse);

module.exports = router;