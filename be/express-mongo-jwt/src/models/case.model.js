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
    required: true,
    unique: false
  },
  case: {
    type: Number,
    required: true,
    unique: false
  }
}, {
  timestamps: true
})

caseSchema.index({ org: 1, case: 1}, { unique: true });

caseSchema.pre('save', async function save (next) {
  return next();
})

module.exports = mongoose.model('Case', caseSchema)
