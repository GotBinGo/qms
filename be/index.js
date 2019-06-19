const http = require('http')
const port = 3000

const requestHandler = (request, response) => {
    const end = request.url.split('/');
    const name = end[end.length-1].split('.')[0];
    console.log(name);
    if(name == 'islogin') {
        response.end('false')
    } else if (name == 'login') {
        response.end('"good"')
    } else if (name == 'getBike') {
        response.end('should get a bike')
    } else if (name == 'logout') {
        response.end('')
    } else if (name == 'endings') {
        response.end('list')
    } 
}

const server = http.createServer(requestHandler)

server.listen(port, (err) => {
  if (err) {
    return console.log('something bad happened', err)
  }

  console.log(`server is listening on ${port}`)
})
