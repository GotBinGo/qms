'use strict'

const express = require('express')
const router = express.Router()
const authController = require('../../controllers/auth.controller')
const eventController = require('../../controllers/event.controller')
const validator = require('express-validation')
const { create } = require('../../validations/user.validation')
const auth = require('../../middlewares/authorization')

router.post('/register', validator(create), authController.register)
router.post('/guest', authController.guest)
router.post('/login', authController.login)

router.get('/isLogin', (req, res) => {
  try {
    auth()(req, res, (x, y, z) => {
      res.json(!x)
    });
  } catch {
    res.json(false)
  }
})
router.get('/secret2', auth(['admin']), (req, res) => {
  // example route for auth
  res.json({ message: 'Only admin can access' })
})
router.get('/history', auth(['user']), eventController.history)
router.post('/getNewNumber', auth(['user']), eventController.getNewNumber)
router.get('/getLatestNumber', auth(['user']), eventController.getLatestNumber)
router.post('/cancelNumber', auth(['user']), eventController.cancelNumber)

module.exports = router
