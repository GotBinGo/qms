'use strict'
var http = require('https');
const APIError = require('../utils/APIError')
const httpStatus = require('http-status')
const Event = require('../models/event.model')
const Rent = require('../models/rent.model')
const User = require('../models/user.model')

// TODO can be RENTED
// TODO can be RENTED
// TODO can be RENTED
// TODO can be RENTED
// TODO can be RENTED

function canRent() {
    return false;
}

exports.rent = async (req, res, next) => {
    if (!canRent()) {
        return next(new APIError('Cannot rent this bike at this time', httpStatus.FORBIDDEN))
    }
    Rent.insertMany([{start: "start", bike:"bike", user: req.user}])
    res.json('ok');
}

exports.history = async (req, res, next) => {
  // try {
  //   const x = await Event.find().exec();
  //   res.json(x);
  // } catch(e) {
  //   console.log('err', e)
  //   res.json(e);
  // }
  try {
    matchDB(req).then(x => {
        res.json(x);
    }).catch(x => {
        console.log(x);
        res.json(x);
    }) ;
  } catch(e) {
    console.log('err', e)
    res.json(e);
  }
}

async function matchDB(req) {
    var db = await Event.find().exec()
    var sc = await scrape();
    var matchCount = db.length;
    for(var i = 0; i < matchCount; i++) {
        if (db[i].start == sc[i].start) {
        } else {
            throw new Error('non matching history, idx:' + i);
        }
    }
    await Event.insertMany(sc.filter((x, j) => j >= i));
    for(; i < sc.length; i ++) {
        console.log('one to add');
    }
    db = await Rent.aggregate([
        { "$lookup": { 
            "from": "events", 
            "localField": "start", 
            "foreignField": "start", 
            "as": "collection2_doc"
        }}, 
        { "$unwind": "$collection2_doc" },
        { "$redact": { 
            "$cond": [
                { "$eq": [ "$bike", "$collection2_doc.bike" ] }, 
                "$$KEEP", 
                "$$PRUNE"
            ]
        }}, 
        { "$project": { 
            "start": 1, 
            "bike": 1, 
            "route": "$collection2_doc.route",
            "end": "$collection2_doc.end"
        }}
    ]);
    db = await Event.find();
    return db;
}

function scrape() {
  return new Promise(function (resolve, reject) {
      var opts = {
          method: 'GET',
          host: 'bubi.nextbike.net',
          path: '/iframe/',
          headers: { 'Cookie': 'parameters[dlkey]=3Qb4JvI9RI1VLyit'}
      };
      var results = '';    
      var req = http.request(opts, function(res) {
          res.on('data', function (chunk) {
              results = results + chunk;
          }); 
          res.on('end', function () {
              if(results.split('Forgot PIN').length > 1) {
                  return reject('no login')
              }
              try {
                  const table = results.split('<table')[1].split('/table')[0];
                  var rows = table.split('<tr').map(x => x.split('td').filter((x, i) => [1, 3].includes(i)).map(x => x.split('>')[1].split('<')[0]))
                  rows.shift()
                  rows.shift()
                  rows.shift()
                  rows.shift()
                  rows.shift()
                  rows.pop()
                  rows = rows.map(x => { 
                      var ret = {};
                      ret.start = x[0];
                      const sp = x[1].split(' ')
                      ret.bike = sp[1]
                      ret.end = sp[3]
                      sp.shift()
                      sp.shift()
                      sp.shift()
                      sp.shift()
                      ret.route = sp.join(' ')
                      return ret;
                  })
                  resolve(rows);
              } catch (e) {
                  reject('parse error')
              }
          }); 
      });    
      req.on('error', function(e) {
          reject('request error');
      });    
      req.end();
  })

}