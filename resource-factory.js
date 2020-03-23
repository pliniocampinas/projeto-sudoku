var http = require('http');
var fs = require('fs');
var path = require('path');
// Paginas de conteudo
const spawn = require("child_process").spawn;


const resources = [
    {
        url: '', 
        type: 'static',
        header: { 'Content-Type': 'text/html'}, 
        encoding: '',
        filePath: 'index.html',
        content: '', 
        status: 200
    },
    {
        url: '/', 
        type: 'static', 
        header: { 'Content-Type': 'text/html'}, 
        encoding: 'utf-8',
        filePath: 'index.html',
        content: '', 
        status: 200
    },
    {
        url: '/sudoku', 
        type: 'static', 
        header: { 'Content-Type': 'text/html'}, 
        encoding: 'utf-8',
        filePath: 'tabuleiro-sudoku.html', 
        content: '', 
        status: 200
    },
    {
        url: '/app.js', 
        type: 'static', 
        header: { 'Content-Type': 'application/javascript'}, 
        encoding: 'utf-8',
        filePath: 'app.js', 
        content: '', 
        status: 200
    },
    {
        url: '/app.css', 
        type: 'static', 
        header: { 'Content-Type': 'text/css'}, 
        encoding: 'utf-8',
        filePath: 'app.css', 
        content: '', 
        status: 200
    },
    {
        url: '/favicon.ico', 
        type: 'static', 
        header: { 'Content-Type': 'image/x-icon'}, 
        encoding: '',
        filePath: 'favicon.ico', 
        content: '', 
        status: 200
    },
    {
        url: '404', 
        type: 'static', 
        header: { 'Content-Type': 'text/html'}, 
        encoding: 'utf-8',
        filePath: '404.html', 
        content: '', 
        status: 404
    },
    {
        url: '/vetor-tabuleiro', 
        type: 'data', 
        header: { 'Content-Type': 'text/html'}, 
        encoding: '',
        filePath: '', 
        content: '', 
        status: 200
    }
];

async function getTableSolved(linearTable, callback) {
    const max_results = 1
    const pythonProcess = spawn('python',["sudoku-solver.py", linearTable, max_results]);
    
    var status = 1;
    var dataStr = '';
    pythonProcess.stdout.on('data', (data) => {
        // console.log("data.toString");
        // console.log(data.toString());
        dataStr = data.toString();
        status = 200;
        callback(status, dataStr);
    });

    pythonProcess.stderr.on('data',(data)=>{
        //Here data is of type buffer
        console.log("data.toString err");
        console.log(data.toString())
        dataStr = data.toString();
        status = 500;
        callback(status, dataStr);
    })
}

async function _getResource(url, body, callback){
    var resource = resources.filter(x => x.url == url)[0];
    // console.log(body);
    if(resource === undefined)
        resource = resources.filter(x => x.url == '404')[0];

    if(resource.type === 'static') {
        callback(resource);
    } else if(resource.url === '/vetor-tabuleiro') {
        var parsedBody = JSON.parse(body)
        var linearTable = []
        parsedBody.forEach((item, index) => {
            linearTable.push(parseInt(item))
        })
        console.log(linearTable);
        getTableSolved(linearTable, (status, dataStr) => {
            resource.content = dataStr;
            resource.status = status;
            callback(resource);
        });
        
    } else {
        callback(resource);
    }
}

module.exports.getResource = _getResource
