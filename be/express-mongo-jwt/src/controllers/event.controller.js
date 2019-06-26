'use strict'

const Event = require('../models/Event.model')

exports.history = async (req, res, next) => {
  try {
    const x = await Event.find().exec();
    res.json(x);
  } catch(e) {
    console.log('err', e)
    res.json(e);
  }
}
