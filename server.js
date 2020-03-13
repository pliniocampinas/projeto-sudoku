var http = require('http');
var fs = require('fs');
var path = require('path');
var resourceFactory = require('./resource-factory');

// var linearTable = [6, 0, 4, 0, 0, 7, 0, 0, 0, 8, 0, 0, 0, 0, 3, 0, 5, 6, 0, 3, 0, 9, 0, 0, 8, 0, 0, 0, 0, 0, 5, 0, 0, 0, 9, 0,
//     0, 0, 8, 0, 1, 0, 0, 6, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 7, 0, 2, 0, 0, 3, 8, 0, 0, 1, 0, 0,
//     0, 0, 7, 0, 0, 2, 0, 0, 0];

// const spawn = require("child_process").spawn;
// const pythonProcess = spawn('python',["sudoku-solver.py", linearTable]);

// pythonProcess.stdout.on('data', (data) => {
//     console.log("data.toString");
//     console.log(data.toString());
// });

// pythonProcess.stderr.on('data',(data)=>{
//     //Here data is of type buffer
//     console.log(data.toString())
//   })

// pythonProcess.on('error', function(error) {
//     console.log("Error: bad command", error);
// });


http.createServer(function (request, response) {
    console.log('request ', request.url);

    var resource;
    var body = ''
    if (request.method == 'POST') {
        console.log('POST')
        request.on('data', function(data) {
            body += data
        //   console.log('Partial body: ' + body)
        })
        request.on('end', function () {
            resourceFactory.getResource(request.url, body, (resource) => {
                response.writeHead(resource.status, resource.header);
                response.end(resource.content, resource.encoding);
            });
        });
    } else {
        resourceFactory.getResource(request.url, body, (resource) => {
            response.writeHead(resource.status, resource.header);
            response.end(resource.content, resource.encoding);
        });
    } 

    // var extname = filePath === ''? '.html': String(path.extname(filePath)).toLowerCase();
    // var contentType = resource.contentType;
    // var mimeTypes = {
    //     '.html': 'text/html',
    //     '.js': 'text/javascript',
    //     '.css': 'text/css',
    //     '.json': 'application/json',
    //     '.png': 'image/png',
    //     '.jpg': 'image/jpg',
    //     '.gif': 'image/gif',
    //     '.wav': 'audio/wav',
    //     '.mp4': 'video/mp4',
    //     '.woff': 'application/font-woff',
    //     '.ttf': 'application/font-ttf',
    //     '.eot': 'application/vnd.ms-fontobject',
    //     '.otf': 'application/font-otf',
    //     '.svg': 'application/image/svg+xml'
    // };

}).listen(8125);
console.log('Server running at http://127.0.0.1:8125/');