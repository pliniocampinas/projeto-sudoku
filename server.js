var http = require('http');
var fs = require('fs');
var path = require('path');

var dynamicPages = require('./dynamic-pages');
var resourceFactory = require('./resource-factory');

// var linearTable = [6, 0, 4, 0, 0, 7, 0, 0, 0, 8, 0, 0, 0, 0, 3, 0, 5, 6, 0, 3, 0, 9, 0, 0, 8, 0, 0, 0, 0, 0, 5, 0, 0, 0, 9, 0,
//     0, 0, 8, 0, 1, 0, 0, 6, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 7, 0, 2, 0, 0, 3, 8, 0, 0, 1, 0, 0,
//     0, 0, 7, 0, 0, 2, 0, 0, 0];

const spawn = require("child_process").spawn;
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
    console.log('request ', request.data);

    var resource = resourceFactory.getResource(request.url, request.data);
    var filePath = '';
    if(resource.type === 'static')
        filePath = './' + resource.content;
    else if(resource.type === 'dynamic')
        filePath = '';

    var extname = filePath === ''? '.html': String(path.extname(filePath)).toLowerCase();
    var contentType = resource.contentType;
    var mimeTypes = {
        '.html': 'text/html',
        '.js': 'text/javascript',
        '.css': 'text/css',
        '.json': 'application/json',
        '.png': 'image/png',
        '.jpg': 'image/jpg',
        '.gif': 'image/gif',
        '.wav': 'audio/wav',
        '.mp4': 'video/mp4',
        '.woff': 'application/font-woff',
        '.ttf': 'application/font-ttf',
        '.eot': 'application/vnd.ms-fontobject',
        '.otf': 'application/font-otf',
        '.svg': 'application/image/svg+xml'
    };

    console.log(request.url)
    
    if(resource.type === 'static') {
        console.log('Pagina estatica encontrada, lendo file path:' + filePath);
        fs.readFile(filePath, function(error, content) {
            if (error) {    
                if(error.code == 'ENOENT'){
                    fs.readFile('./404.html', function(error, content) {
                        response.writeHead(200, { 'Content-Type': contentType });
                        response.end(content, 'utf-8');
                    });
                }
                else {
                    response.writeHead(500);
                    response.end('Sorry, check with the site admin for error: '+error.code+' ..\n');
                    response.end();
                }
            }
            else {
                response.writeHead(200, { 'Content-Type': contentType });
                response.end(content, 'utf-8');
            }
        });

    } else if(resource.type === 'data') {

        if (request.method == 'POST') {
            console.log('POST')
            var body = ''
            request.on('data', function(data) {
                body += data
            //   console.log('Partial body: ' + body)
            })
            request.on('end', function() {
                var parsedBody = JSON.parse(body)
                // var linearTable = [6, 0, 4, 0, 0, 7, 0, 0, 0, 8, 0, 0, 0, 0, 3, 0, 5, 6, 0, 3, 0, 9, 0, 0, 8, 0, 0, 0, 0, 0, 5, 0, 0, 0, 9, 0,
                //     0, 0, 8, 0, 1, 0, 0, 6, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 7, 0, 2, 0, 0, 3, 8, 0, 0, 1, 0, 0,
                //     0, 0, 7, 0, 0, 2, 0, 0, 0];
                var linearTable = []
                parsedBody.forEach((item, index) => {
                    linearTable.push(parseInt(item))
                })
                console.log(linearTable)
                const pythonProcess = spawn('python',["sudoku-solver.py", linearTable]);
  
                pythonProcess.stdout.on('data', (data) => {
                    console.log("data.toString");
                    console.log(data.toString());
                    response.writeHead(200, {'Content-Type': 'text/html'})
                    response.end('post received')
                });

                pythonProcess.stderr.on('data',(data)=>{
                    //Here data is of type buffer
                    console.log("data.toString err");
                    console.log(data.toString())
                    response.writeHead(500, {'Content-Type': 'text/html'})
                    response.end('post received')
                })

            })
        }
    } else {
        console.log('Pagina estatica NAO encontrada: ' + request.url);
        if( typeof resource.content === 'string' ) {
            // console.log("Content" + resource.content)
            response.writeHead(200, { 'Content-Type': contentType });
            response.end(resource.content, 'utf-8');
        }
        else {
            fs.readFile('./404.html', function(error, content) {
                response.writeHead(200, { 'Content-Type': contentType });
                response.end(content, 'utf-8');
            });
        }
    }


}).listen(8125);
console.log('Server running at http://127.0.0.1:8125/');