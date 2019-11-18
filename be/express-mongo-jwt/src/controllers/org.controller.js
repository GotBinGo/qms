'use strict'
var http = require('https');
const Org = require('../models/org.model')

exports.getOrgs = async (req, res, next) => {
  var a = await Org.find();
  res.json(a);
}

exports.addOrg = async (req, res, next) => {
  try {
    var a = (await Org.insertMany([{name: req.body.name, org: req.body.org}]))[0]
    a.user = a.user._id;
    res.json(a);
  } catch(e) {
    res.json(e);
  }
}

exports.deleteOrgByNum = async (req, res, next) => {
  try {
    var a = (await Org.deleteOne({org: req.body.org}))[0]
    a.user = a.user._id;
    res.json(a);
  } catch(e) {
    res.json(e);
  }
}

exports.deleteOrgByName = async (req, res, next) => {
  try {
    var a = (await Org.deleteOne({name: req.body.name}))[0]
    a.user = a.user._id;
    res.json(a);
  } catch(e) {
    res.json(e);
  }
}
