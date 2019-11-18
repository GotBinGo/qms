'use strict'
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const orgSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  org: {
    type: Number,
    required: true,
    unique: true
  }
}, {
  timestamps: true
})

orgSchema.pre('save', async function save (next) {
  return next();
})

module.exports = mongoose.model('Org', orgSchema)
