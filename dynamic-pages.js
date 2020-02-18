var sudokuPageFactory = require('./sudoku-page-factory');



module.exports = {

    getDynamicPageContent:  (url) => {
        console.log(`getDynamicPageContent da url [${url}]`);
        if(url === '/sudoku')
            return sudokuPageFactory.getPageSudoku();
    }
    
}