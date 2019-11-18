'use strict'
var http = require('https');
const APIError = require('../utils/APIError')
const httpStatus = require('http-status')
const Case = require('../models/case.model')

exports.getCases = async (req, res, next) => {
  var a = await Case.find({org: req.body.org});
  res.json(a);
}

exports.addCase = async (req, res, next) => {
  try {
    var a = (await Case.insertMany([{name: req.body.name, org: req.body.org, case: req.body.case}]))[0]
    a.user = a.user._id;
    res.json(a);
  } catch(e) {
    res.json(e);
  }
}

exports.deleteCaseByNum = async (req, res, next) => {
  try {
    var a = (await Case.deleteOne({org: req.body.org, case: req.body.case}));
    res.json(a);
  } catch(e) {
    res.json(e);
  }
}

exports.deleteCaseByName = async (req, res, next) => {
  try {
    var a = (await Case.deleteOne({org: req.body.org, name: req.body.name}));
    res.json(a);
  } catch(e) {
    res.json(e);
  }
}
