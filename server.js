const http = require('http');
const sudokuSolver = require('./sudoku-solver');
const url = require('url');

http.createServer(function (request, response) {
    console.log('request ', request.url);

    let requestData = url.parse(request.url, true).query;
    let linearTable = requestData.table;
    let maxResults = requestData.maxResults;
    sudokuSolver.getTableSolved(linearTable, maxResults, (solution, status) => {
        response.writeHead(status, { 'Access-Control-Allow-Origin': '*'});
        console.log(solution);
        response.end(solution, 'utf-8');
    });

}).listen(8125);
console.log('Server running at http://127.0.0.1:8125/');