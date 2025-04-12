var http =  require('http');
require('dotenv').config();

http.createServer(function (req, res) {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end('Hello World\n' + process.env.PORT + '\n');
}).listen(process.env.PORT);