const fs = require('fs') // importing module

const requestHandler = (req, res) => {  
    const url = req.url
    const method = req.method

    if (url === '/'){
        res.write('<html>')
        res.write('<head><title>Enter Message</title></head>')
        res.write('<body><form action="/message" method="POST"><input  name="message" type="text"><button type="submit">Send</button></form></body>');
        res.write('</html>')
        return res.end()  
    }
    //console.log(req.url, req.method, req.headers);
    //process.exit();

    if (url === '/message' && method === 'POST'){
        const body = []
        req.on('data', (chunk) => {
            console.log(chunk)
            body.push(chunk)
        })

        return req.on('end', () => {
            const parsedBody = Buffer.concat(body).toString()
            console.log(parsedBody)
            const message = parsedBody.split('=')[1]
            fs.writeFile('message.txt', message, (err) => {
                res.statusCode = 302
                res.setHeader('Location', '/')
                return res.end()
            })
        })
    }
    res.setHeader('Content-Type','text/html')
    res.write('<html>')
    res.write('<head><title>My first Node Server</title></head>')
    res.write('<body><h1>Hello World</h1></body>')
    res.write('</html>')
    res.end()
}

module.exports = requestHandler   //exporting function

//module.exports = {
//    handler: requestHandler,
//    SomeText: 'SomeText is here'
//}
