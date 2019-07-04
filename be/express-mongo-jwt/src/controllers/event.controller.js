'use strict'
var http = require('https');

const Event = require('../models/Event.model')

exports.history = async (req, res, next) => {
  // try {
  //   const x = await Event.find().exec();
  //   res.json(x);
  // } catch(e) {
  //   console.log('err', e)
  //   res.json(e);
  // }
  try {
    scrape().then(x => {
        console.log(JSON.stringify(x));
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