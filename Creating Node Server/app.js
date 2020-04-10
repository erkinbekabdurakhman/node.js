const http = require('http')   //importing global module

const routes = require('./routes.js') // importing local function

const server = http.createServer(routes.handler)

console.log(routes.SomeText)

server.listen(3002);