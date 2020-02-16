var sudokuPageFactory = require('./sudoku-page-factory');

var getPageSudoku = () => {

    var content = '<h1> Tabuleiro Sudoku </h1>';
    var n = 1;
    for (var i = 0; i < 9; i++) {
        for (var j = 0; j < 9; j++) {
            content += '<input style="max-width: 10%; width: 25px;" type="text" value="' + n + '">';
            n++;
//                First name: <input type="text" name="fname"><br>
        }
        content += '<br>';
    }
    return content;
}

module.exports = {

    getDynamicPageContent:  (url) => {
        console.log(`getDynamicPageContent da url [${url}]`);
        if(url === '/sudoku')
            return sudokuPageFactory.getPageSudoku();
    }
    
}