'use strict'
const mongoose = require('mongoose')
const bcrypt = require('bcrypt-nodejs')
const httpStatus = require('http-status')
const APIError = require('../utils/APIError')
const Schema = mongoose.Schema

const statusList = [
  'waiting', 'processing', 'done'
]

const numberSchema = new Schema({
  case: {
    type: Number,
    required: true,
  },
  org: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    default: 'waiting',
    enum: statusList
  },
  delay: {
    type: Number,
    default: 0,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  position: {
    type: Date
  },
  whereToGo: {
    type: String,
    default: 'counter',
  }
}, {
  timestamps: true
})

numberSchema.pre('save', async function save (next) {
  return next();
})

module.exports = mongoose.model('Number', numberSchema)
