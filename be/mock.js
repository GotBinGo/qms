const http = require('http')
const port = 3000
const url = require('url')

const requestHandler = (req, response) => {
    const end = req.url.split('/');
    const name = end[end.length-1].split('.')[0];
    var url_parts = url.parse(req.url,true);
    console.log(name);
    if(name == 'islogin') {
        response.end('false')
    } else if (name == 'login') {
        if(url_parts.query.username && url_parts.query.password) {
            login(response, url_parts.query.username, url_parts.query.password);
        } else {
            response.end('"bad login"')
        }
    } else if (name == 'getBike') {
        getBike(response, url_parts.query.code);
    } else if (name == 'logout') {
        response.end('')
    } else if (name == 'history') {
        response.end('["afad", "gdgd"]');
    } 
}

function login(response, user, pass) {
    if(user == 'tomi' && pass == '123') {
        response.end('"good"')
    } else {
        response.end('"bad login"')
    }
}

function getBike(response, code) {
}

const server = http.createServer(requestHandler)

server.listen(port, (err) => {
  if (err) {
    return console.log('something bad happened', err)
  }

  console.log(`server is listening on ${port}`)
})
