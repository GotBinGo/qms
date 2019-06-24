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
    console.log('sc');
    var url = require('url');
    var http = require('https');
    var endpoint = 'https://bubi.nextbike.net/iframe/';
    var opts = url.parse(endpoint);
    opts.method = 'GET';
    opts.host = "bubi.nextbike.net"
    opts.path = "/iframe/"
    opts.headers = {
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3',
        'Accept-Encoding': 'gzip, deflate, br',
        'Accept-Language': 'hu-HU,hu;q=0.9,en-US;q=0.8,en;q=0.7,nl;q=0.6',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
        'Cookie': 'PHPSESSID=d089e777741ce0eb9b87d70f9dbb5fec',
        'Host': 'bubi.nextbike.net',
        'Pragma': 'no-cache',
        'Upgrade-Insecure-Requests': '1'
    }
    var options = { 
        hostname: 'example.com',
        path: '/somePath.php',
        method: 'GET',
        headers: {'Cookie': 'myCookie=myvalue'}
    };
    var results = ''; 
    var req = http.request(opts, function(res) {
        res.on('data', function (chunk) {
            results = results + chunk;
            
        }); 
        res.on('end', function () {
            console.log(results);
        }); 
    });    
    req.on('error', function(e) {
    });    
    req.end();

    // http.request(options, function (res) {
    //     console.log(res.statusCode);
    //     res.on('data', function (chunk) {
    //         results = results + chunk;
    //     }); 
    //     res.on('end', function () {
    //         console.log('end');
    //     }); 
    // });
}
scrape();
// console.log(getConcurrentCount(getLatest()))
