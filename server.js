const http = require('http')
const sudokuSolver = require('./sudoku-solver')
const url = require('url')

http.createServer(function (request, response) {
    console.log('request.url ', request.url)
    const searchParams = new url.URL(request.url, 'https://dummyurl.com').searchParams
    const linearTable = searchParams?.get('table')?.split(',')
    if(!linearTable || linearTable.length < 81) {
        response.writeHead(400, { 'Access-Control-Allow-Origin': '*'})
        response.end({error: 'Bad sudoku table'}, 'utf-8')
    }
    const maxResults = searchParams.get('maxResults')
    solver = new sudokuSolver.Solver()

    solver.setMaxResults(maxResults)
    solver.setBoard(linearTable)
    console.log('solving the sudoku')
    solver.solve()
    console.log('solved')
    const results = solver.getResults()
    response.writeHead(200, { 'Access-Control-Allow-Origin': '*'})
    response.end(JSON.stringify({'results': results}), 'utf-8')
}).listen(8125)
console.log('Server running at http://127.0.0.1:8125/')