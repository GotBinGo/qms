var http = require('https');

function createState(inProgress) {
    return { inProgress }
}

function getLatest() {
    return [createState(true), createState(false), createState(false), createState(false), createState(false)]
}



function getConcurrentCount(states) {
    return states.filter(x => x.inProgress).length
}

function scrape() {
    return new Promise(function (resolve, reject) {
        var opts = {
            method: 'GET',
            host: 'bubi.nextbike.net',
            path: '/iframe/',
            headers: { 'Cookie': 'PHPSESSID=d089e777741ce0eb9b87d70f9dbb5fec'}
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
                    rows = table.split('<tr').map(x => x.split('td').filter((x, i) => [1, 3].includes(i)).map(x => x.split('>')[1].split('<')[0]))
                    rows.shift()
                    rows.shift()
                    rows.shift()
                    rows.shift()
                    rows.shift()
                    rows.pop()
                    rows = rows.map(x => { 
                        ret = {};
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
scrape().then(x => {
    console.log(x);
}).catch(x => {
    console.log(x);
}) ;
// console.log(getConcurrentCount(getLatest()))
