'use strict'

const express = require('express')
const router = express.Router()
const authController = require('../../controllers/auth.controller')
const numberController = require('../../controllers/number.controller')
const orgController = require('../../controllers/org.controller')
const caseController = require('../../controllers/case.controller')
const userController = require('../../controllers/user.controller')

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
router.post('/getNewNumber', auth(['guest', 'user', 'worker', 'admin']), numberController.getNewNumber)
router.post('/getLatestNumber', auth(['guest', 'user', 'worker', 'admin']), numberController.getLatestNumber)
router.post('/delayNumber', auth(['guest', 'user', 'worker', 'admin']), numberController.delayNumber)
router.post('/cancelNumber', auth(['guest', 'user', 'worker', 'admin']), numberController.cancelNumber)
router.post('/getNextNumber', auth(['guest', 'user', 'worker', 'admin']), numberController.getNextNumber)

router.get('/getOrgs', auth(['guest', 'user', 'worker', 'admin']), orgController.getOrgs)
router.post('/addOrg', auth(['guest', 'user', 'worker', 'admin']), orgController.addOrg)
router.post('/deleteOrgByNum', auth(['guest', 'user', 'worker', 'admin']), orgController.deleteOrgByNum)
router.post('/deleteOrgByName', auth(['guest', 'user', 'worker', 'admin']), orgController.deleteOrgByName)

router.post('/getCases', auth(['guest', 'user', 'worker', 'admin']), caseController.getCases)
router.post('/addCase', auth(['guest', 'user', 'worker', 'admin']), caseController.addCase)
router.post('/deleteCaseByNum', auth(['guest', 'user', 'worker', 'admin']), caseController.deleteCaseByNum)
router.post('/deleteCaseByName', auth(['guest', 'user', 'worker', 'admin']), caseController.deleteCaseByName)

router.get('/getUsers', auth(['guest', 'user', 'worker', 'admin']), userController.getUsers)
router.post('/setUser', auth(['guest', 'user', 'worker', 'admin']), userController.setUser)



module.exports = router
