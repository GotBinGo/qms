'use strict'
var http = require('https');
const Org = require('../models/org.model')

exports.getOrgs = async (req, res, next) => {
  var a = await Org.find();
  res.json(a);
}

exports.addOrg = async (req, res, next) => {
  try {
    var o = await Org.findOne({}, {}, {sort: { 'org' : -1 }});
    console.log('XXXXXXXXXXXXXXXXXXXx', o.org)
    // const n = n.org+1;
    var a = (await Org.insertMany([{name: req.body.name, org: o.org+1}]))[0]
    a.user = a.user._id;
    res.json(a);
  } catch(e) {
    res.json(e);
  }
}

exports.deleteOrgByNum = async (req, res, next) => {
  try {
    var a = (await Org.deleteOne({org: req.body.org}))
    res.json(a);
  } catch(e) {
    res.json(e);
  }
}

exports.deleteOrgByName = async (req, res, next) => {
  try {
    var a = (await Org.deleteOne({name: req.body.name}))
    res.json(a);
  } catch(e) {
    res.json(e);
  }
}
