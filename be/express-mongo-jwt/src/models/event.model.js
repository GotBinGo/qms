'use strict'
const mongoose = require('mongoose')
const bcrypt = require('bcrypt-nodejs')
const httpStatus = require('http-status')
const APIError = require('../utils/APIError')
const Schema = mongoose.Schema


const eventSchema = new Schema({
  start: {
    type: String,
    required: true,
  },
  bike: {
    type: String,
    required: true,
  },
  end: {
    type: String,
  },
  route: {
    type: String,
  }
}, {
  timestamps: true
})

eventSchema.pre('save', async function save (next) {
  return next();
})

module.exports = mongoose.model('Event', eventSchema)
