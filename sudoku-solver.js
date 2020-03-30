const spawn = require("child_process").spawn;

function getTableSolved(linearTable, maxResults, callback) {
    const pythonProcess = spawn('python',["sudoku-solver.py", linearTable, maxResults]);
    
    var status = 1;
    var dataStr = '';
    pythonProcess.stdout.on('data', (data) => {
        // console.log("data.toString");
        // console.log(data.toString());
        dataStr = data.toString();
        status = 200;
        callback(dataStr, status);
    });

    pythonProcess.stderr.on('data',(data)=>{
        //Here data is of type buffer
        console.log("data.toString err");
        console.log(data.toString())
        dataStr = data.toString();
        status = 500;
        callback(dataStr, status);
    })
}

module.exports.getTableSolved = getTableSolved
