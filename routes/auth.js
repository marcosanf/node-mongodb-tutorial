const express       = require('express')
const router        = express.Router()


const AuthController    = require('../controllers/AuthController')

router.post('/singup', AuthController.singup)
router.post('/singin', AuthController.singin)

module.exports = router