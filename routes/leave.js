const express = require('express')
const authController = require('../controllers/leave')

const router = express.Router()

router.post ('/login', authController.login)
router.post ('/save', authController.save)

module.exports = router