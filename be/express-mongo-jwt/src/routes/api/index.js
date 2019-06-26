'use strict'
const express = require('express')
const router = express.Router()
const authRouter = require('./auth.route')

router.get('/status', (req, res) => { res.send({status: 'OK'}) })

router.use('/auth', authRouter)

module.exports = router
