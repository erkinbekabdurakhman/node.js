const http = require('http')

const routes = require('./router.js')

const server = http.createServer(routes)

server.listen(3003);