var http = require('http');
var fs = require('fs');
var path = require('path');
var resourceFactory = require('./resource-factory');

var nStatic = require('node-static');
var fileServer = new nStatic.Server('./public', {
    etag: false
  });

http.createServer(function (request, response) {
    console.log('request ', request.url);

    var body = ''
    if(request.url == '/vetor-tabuleiro') {
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
            request.url = resource.filePath;
            fileServer.serve(request, response);
        });
    }

}).listen(8125);
console.log('Server running at http://127.0.0.1:8125/');