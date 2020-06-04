const express = require('express')
const router = express.Router()

const { authJwt } = require("../middleware");
const lessonController = require('../controllers/lesson.controller')

router.get('/', [authJwt.verifyToken], lessonController.getAllLesson);
router.get('/:id', [authJwt.verifyToken], lessonController.getLesson);
router.post('/', [authJwt.verifyToken], lessonController.addLesson);
router.put('/:id', [authJwt.verifyToken], lessonController.updateLesson);
router.delete('/:id', [authJwt.verifyToken], lessonController.deleteLesson);
router.delete('/', [authJwt.verifyToken], lessonController.deleteLessonAll);

module.exports = router;