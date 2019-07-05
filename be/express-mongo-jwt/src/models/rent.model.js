'use strict'
const mongoose = require('mongoose')
const bcrypt = require('bcrypt-nodejs')
const httpStatus = require('http-status')
const APIError = require('../utils/APIError')
const Schema = mongoose.Schema


const rentSchema = new Schema({
  start: {
    type: String,
    required: true,
  },
  bike: {
    type: String,
    required: true,
  }, 
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
}

}, {
  timestamps: true
})

rentSchema.pre('save', async function save (next) {
  return next();
})

module.exports = mongoose.model('Rent', rentSchema)
