var sudokuPageFactory = require('./sudoku-page-factory');
var dynamicPages = require('./dynamic-pages');

const resources = [
    {path = '', type = 'static', content: 'index.html'},
    {path = '/', type = 'static', content: 'index.html'},
    {path = 'sudoku-page', type = 'dynamic', content: ''},
    {}
];

var getResource = (path) => {
    var resource = resources.filter(x => x.path == path)[0];
    
    if(resource.type == 'static')
      return resource.content;
    else if(resource.type == 'dynamic')
      return dynamicPages.getDynamicPageContent(path);
};

module.exports = {

    getPage:  (url) => {
        console.log(`getPage da url [${url}]`);
        if(url === '/sudoku')
            return sudokuPageFactory.getPageSudoku();
    }
    
}
