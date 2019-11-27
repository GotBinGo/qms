'use strict'
var http = require('https');
const APIError = require('../utils/APIError')
const httpStatus = require('http-status')
const Num = require('../models/number.model')

// TODO can be RENTED
// TODO can be RENTED
// TODO can be RENTED
// TODO can be RENTED
// TODO can be RENTED



exports.getNewNumber = async (req, res, next) => {

    try {
        var a = (await Num.insertMany([{case: req.body.case, org: req.body.org, user: req.user}]))[0]
        a.user = a.user._id;
        res.json(a);
    } catch(e) {
        res.json(e);
    }
}

exports.getLatestNumber = async (req, res, next) => {
    var a = await Num.findOne({user: req.user, $or: [{status: 'waiting'}, {status: 'processing'}]}, {}, {sort: { 'createdAt' : -1 }});
    const ret = JSON.parse(JSON.stringify(a))
    if (ret) {
        ret.timeToGo = 10;
    }
    res.json(ret);
}

exports.cancelNumber = async (req, res, next) => {
    var a = await Num.findOne({_id: req.body.id}, {}, {sort: { 'createdAt' : -1 }});
    a.status = "done";
    await a.save()
    res.json(a);
}

exports.getNextNumber = async (req, res, next) => {
    var a = await Num.findOne({org: req.body.org, status: 'waiting', case: { "$in": req.body.cases}}, null, {sort: { 'createdAt' : -1 }});

    res.json(a);
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
    // matchDB(req).then(x => {
    //     res.json(x);
    // }).catch(x => {
    //     console.log(x);
    //     res.json(x);
    // }) ;
  } catch(e) {
    console.log('err', e)
    res.json(e);
  }
}

// async function matchDB(req) {
//     var db = await Event.find().exec()
//     var sc = await scrape();
//     var matchCount = db.length;
//     for(var i = 0; i < matchCount; i++) {
//         if (db[i].start == sc[i].start) {
//         } else {
//             throw new Error('non matching history, idx:' + i);
//         }
//     }
//     await Event.insertMany(sc.filter((x, j) => j >= i));
//     for(; i < sc.length; i ++) {
//         console.log('one to add');
//     }
//     db = await Rent.aggregate([
//         { "$lookup": { 
//             "from": "events", 
//             "localField": "start", 
//             "foreignField": "start", 
//             "as": "collection2_doc"
//         }}, 
//         { "$unwind": "$collection2_doc" },
//         { "$redact": { 
//             "$cond": [
//                 { "$eq": [ "$bike", "$collection2_doc.bike" ] }, 
//                 "$$KEEP", 
//                 "$$PRUNE"
//             ]
//         }}, 
//         { "$project": { 
//             "start": 1, 
//             "bike": 1, 
//             "route": "$collection2_doc.route",
//             "end": "$collection2_doc.end"
//         }}
//     ]);
//     db = await Event.find();
//     return db;
// }

// function scrape() {
//   return new Promise(function (resolve, reject) {
//       var opts = {
//           method: 'GET',
//           host: 'bubi.nextbike.net',
//           path: '/iframe/',
//           headers: { 'Cookie': 'parameters[dlkey]=3Qb4JvI9RI1VLyit'}
//       };
//       var results = '';    
//       var req = http.request(opts, function(res) {
//           res.on('data', function (chunk) {
//               results = results + chunk;
//           }); 
//           res.on('end', function () {
//               if(results.split('Forgot PIN').length > 1) {
//                   return reject('no login')
//               }
//               try {
//                   const table = results.split('<table')[1].split('/table')[0];
//                   var rows = table.split('<tr').map(x => x.split('td').filter((x, i) => [1, 3].includes(i)).map(x => x.split('>')[1].split('<')[0]))
//                   rows.shift()
//                   rows.shift()
//                   rows.shift()
//                   rows.shift()
//                   rows.shift()
//                   rows.pop()
//                   rows = rows.map(x => { 
//                       var ret = {};
//                       ret.start = x[0];
//                       const sp = x[1].split(' ')
//                       ret.bike = sp[1]
//                       ret.end = sp[3]
//                       sp.shift()
//                       sp.shift()
//                       sp.shift()
//                       sp.shift()
//                       ret.route = sp.join(' ')
//                       return ret;
//                   })
//                   resolve(rows);
//               } catch (e) {
//                   reject('parse error')
//               }
//           }); 
//       });    
//       req.on('error', function(e) {
//           reject('request error');
//       });    
//       req.end();
//   })

// }