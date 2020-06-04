const express = require('express')
const router = express.Router()

const { authJwt } = require("../middleware");
const roleController = require('../controllers/role.controller')

router.get('/', [authJwt.verifyToken], roleController.getAllRole);
router.get('/:id', [authJwt.verifyToken], roleController.getRole);
router.post('/', [authJwt.verifyToken], roleController.addRole);
router.put('/:id', [authJwt.verifyToken], roleController.updateRole);
router.delete('/:id', [authJwt.verifyToken], roleController.deleteRole);
router.delete('/', [authJwt.verifyToken], roleController.deleteRoleAll);

module.exports = router;