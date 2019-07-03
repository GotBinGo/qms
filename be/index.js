var http = require('https');
var fs = require('fs');

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
// scrape().then(x => {
//     console.log(JSON.stringify(x));
// }).catch(x => {
//     console.log(x);
// }) ;

function fromDB(){
    var a = fs.readFileSync('log.txt').toString();
    a = JSON.parse(a);
    return a;
}

async function matchDB() {
    var db = fromDB()
    var sc = await scrape();
    var matchCount = db.length;
    for(var i = 0; i < matchCount; i++) {
        if (db[i].start == sc[i].start) {
        } else {
            throw new Error('non matching history');
        }

    }
    for(; i < sc.length; i ++) {
        console.log('one to add');
    }
}

async function main() {
    try {
        await matchDB();
    } catch (e){
        console.log(e)
    }
}

main();
