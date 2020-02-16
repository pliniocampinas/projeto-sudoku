var http = require('http');
var fs = require('fs');
var path = require('path');

var dynamicPages = require('./dynamic-pages');
var resourceFactory = require('./resource-factory');

const pagesPath = []
pagesPath['/'] = '/index.html'
pagesPath[''] = '/index.html'
// responses['/inscreva-se'] = '<h1>Inscreva-se</h1>'
// responses['/local'] = '<h1>Local</h1>'
// responses['/contato'] = '<h1>Contato</h1>'
// responses['/naoExiste'] = '<h1>URL sem resposta definida!</h1>'

var getPagePath = (url) => {
    return pagesPath[url]
}


http.createServer(function (request, response) {
    console.log('request ', request.url);

    var pagePath = getPagePath(request.url);
    if(!(pagePath === undefined)) {
        filePath = '.' + pagePath;
    } else {
        filePath = '.' + getPagePath('404');
    }

    var encontrouPagina = !(pagePath === undefined)

    var extname = pagePath === undefined? '.html': String(path.extname(filePath)).toLowerCase();
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

    // contentType = mimeTypes[extname] || 'application/octet-stream';
    console.log(request.url)

    
    if(encontrouPagina) {
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
        const content = dynamicPages.getDynamicPageContent(request.url);
        if(request.url == '/favicon.ico') {
            response.writeHead(200, { 'Content-Type': contentType });
            response.end(content, 'utf-8');
        }
        else if( typeof content === 'string' ) {
            console.log("Content" + content)
            response.writeHead(200, { 'Content-Type': contentType });
            response.end(content, 'utf-8');
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