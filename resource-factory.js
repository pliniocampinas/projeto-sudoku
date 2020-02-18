// Paginas de conteudo
var sudokuPageFactory = require('./sudoku-page-factory');

const resources = [
    {url: '', type: 'static', content: 'index.html', status: 200},
    {url: '/', type: 'static', content: 'index.html', status: 200},
    {url: '404', type: 'static', content: '404.html', status: 404},
    {url: '/sudoku', type: 'dynamic', content: '', status: 200},
    {url: '/vetor-tabuleiro', type: 'data', content: '', status: 200}
];

var getDynamicPageContent = (url) => {
    console.log(`getDynamicPageContent da url [${url}]`);
    if(url === '/sudoku')
        return sudokuPageFactory.getPage();
    else
        return '';
}

var getDataResource = (url) => {
    console.log(`getDynamicPageContent da url [${url}]`);
    if(url === '/vetor-tabuleiro')
        return sudokuPageFactory.getPage();
    else
        return '';
}


module.exports = {

    getResource: (url, body) => {
        var resource = resources.filter(x => x.url == url)[0];
        console.log(body);
        if(resource === undefined)
            resource = {url: '404', type: 'static', content: '404.html'};
        if(resource.type == 'static')
          return resource;
        else if(resource.type == 'dynamic') {
            resource.content = getDynamicPageContent(url);
            return resource;
        }
        else if(resource.type == 'data') {
            resource.content = getDataResource();
            return resource;
        }
        else
            return resource;
    }
}
