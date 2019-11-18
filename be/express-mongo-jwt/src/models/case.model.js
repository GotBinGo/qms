'use strict'
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const caseSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  org: {
    type: Number,
    required: true
  },
  case: {
    type: Number,
    required: true
  }
}, {
  timestamps: true
})

caseSchema.pre('save', async function save (next) {
  return next();
})

module.exports = mongoose.model('Case', caseSchema)
