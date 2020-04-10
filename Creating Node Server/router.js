const fs = require('fs') // importing module

const requestHandler = (req, res) => {  
    const url = req.url
    const method = req.method

    if (url === '/'){
        res.write('<html>')
        res.write('<head><title>Enter User</title></head>')
        res.write('<body><form action="/createuser" method="POST"><input  name="createuser" type="text"><button type="submit">Create</button></form></body>');
        res.write('</html>')
        return res.end()  
    }
    //console.log(req.url, req.method, req.headers);
    //process.exit();

    if (url === '/createuser' && method === 'POST'){
        const body = []
        req.on('data', (chunk) => {
            console.log(chunk)
            body.push(chunk)
        })

        return req.on('end', () => {
            const parsedBody = Buffer.concat(body).toString()
            console.log(parsedBody)
            const createuser = parsedBody.split('=')[1]
            fs.writeFile('createuser.txt', createuser, (err) => {
                res.statusCode = 302
                res.setHeader('Location', '/')
                return res.end()
            })
        })
    }
    res.setHeader('Content-Type','text/html')
    res.write('<html>')
    res.write('<head><title>My first Node Server</title></head>')
    res.write('<body><h1>Welcome to my page</h1><ul><li>User 1</li></ul></body>')
    res.write('</html>')
    res.end()
}

module.exports = requestHandler   //exporting function