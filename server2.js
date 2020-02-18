var http = require('http');
var fs = require('fs');
var path = require('path');

var dynamicPages = require('./dynamic-pages');
var resourceFactory = require('./resource-factory');


http.createServer(function (request, response) {
    console.log('request ', request.data);

    var resource = resourceFactory.getResource(request.url, request.data);
    var filePath = '';
    if(resource.type === 'static')
        filePath = '.' + resource.content;
    else if(resource.type === 'dynamic')
        filePath = '';

    var extname = filePath === ''? '.html': String(path.extname(filePath)).toLowerCase();
    var contentType = 'text/html';
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

    } else {
        console.log('Pagina estatica NAO encontrada: ' + request.url);
        if(request.url == '/favicon.ico') {
            response.writeHead(200, { 'Content-Type': contentType });
            response.end(content, 'utf-8');
        }
        else if( typeof resource.content === 'string' ) {
            console.log("Content" + resource.content)
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