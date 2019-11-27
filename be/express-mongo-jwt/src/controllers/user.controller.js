'use strict'
var http = require('https');
const Org = require('../models/org.model')
const User = require('../models/user.model')

exports.getUsers = async (req, res, next) => {
  var a = await User.find();
  res.json(a);
}

exports.setUser = async (req, res, next) => {
  try {
    var a = await User.findOne({_id: req.body.id});
    a.role = req.body.role;
    a.org = req.body.org;
    await a.save()
    console.log(a);
    res.json(a);
  } catch(e) {
    res.json(e);
  }
}