'use strict'
var http = require('https');
const APIError = require('../utils/APIError')
const httpStatus = require('http-status')
const Num = require('../models/number.model')

exports.getNewNumber = async (req, res, next) => {

    try {
        var a = (await Num.insertMany([{case: req.body.case, org: req.body.org, user: req.user, }]))[0]
        a.position = a.createdAt;
        a.save();
        a.user = a.user._id;
        res.json(a);
    } catch(e) {
        res.json(e);
    }
}

exports.getLatestNumber = async (req, res, next) => {
    if(req.body.id == null)  {
        var a = await Num.findOne({user: req.user, $or: [{status: 'waiting'}, {status: 'processing'}]}, {}, {sort: { 'position' : -1 }});
    } else {
        var a = await Num.findOne({_id: req.body.id}, {}, {sort: { 'position' : -1 }});
    }
    const ret = JSON.parse(JSON.stringify(a))
    if (ret) {
        var list = await Num.find({org: ret.org, status: 'waiting', position: {$lt: ret.position}}, null, {sort: { 'position' : 1 }});

        ret.timeToGo = list.length;
    }
    res.json(ret);
}

exports.cancelNumber = async (req, res, next) => {
    var a = await Num.findOne({_id: req.body.id}, {}, {sort: { 'position' : -1 }});
    if(a) {
        a.status = "done";
        await a.save()
    }
    res.json(a);
}

exports.getNextNumber = async (req, res, next) => {
    var a = await Num.findOne({org: req.body.org, status: 'waiting', case: { "$in": req.body.cases}}, null, {sort: { 'position' : 1 }});
    if(a) {
        a.status = "processing"
        a.whereToGo = req.body.whereToGo || a.whereToGo;
        a.save();
    }
    res.json(a);
}

exports.delayNumber = async (req, res, next) => {
    var a = await Num.findOne({_id: req.body.id});
    if(a) {
        a.position = new Date(a.position.getTime() + 600000);
        await a.save()
    }
    res.json(a);
}