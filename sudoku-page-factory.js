
// Template
// `
// <!doctype html>

// <html lang="en">
// <head>
//   <meta charset="utf-8">

//   <title>The HTML5 Herald</title>
//   <meta name="description" content="The HTML5 Herald">
//   <meta name="author" content="SitePoint">

//   <link rel="stylesheet" href="css/styles.css?v=1.0">

// </head>

// <body>
//   <script src="js/scripts.js"></script>
// </body>
// </html>
// `

// var getScript = () => {
// var getBody = () => {
// var getHtml = (bodyContent, scriptTag) => {
//    
// };

var getScript = () => {

    var script = 
    `
    <script src="https://unpkg.com/axios/dist/axios.min.js"></script>
    
    <script>

    import axios from 'axios';


    function submitSudoku() {
            
        var valores; 
        var n = 1;
        for (var i = 0; i < 9; i++) {
            for (var j = 0; j < 9; j++) {

                var x = document.getElementById(n);
                x.value = n;
                valores.push({ value: x.value });
                n++;
            }
        }

        axios.post(
            '/vetor-tabuleiro',
            valores,
            { options }
        );
        
    };

    function clearTable() {
        var n = 1;
        var inputs = document.querySelectorAll(".casa-tabuleiro");

        inputs.forEach((input, index) => {
            input.value = ;
        });
    };

    </script>
    `;



    return script;
};

var getBody = () => {

    var content = '<h1> Tabuleiro Sudoku </h1>';
    var inputs = '';
    var n = 1;
    for (var i = 0; i < 9; i++) {
        for (var j = 0; j < 9; j++) {
            inputs += '<input class="casa-tabuleiro" style="max-width: 10%; width: 25px;" type="text" id="' + n + '">';
            n++;
//                First name: <input type="text" name="fname"><br>
        }
        inputs += '<br>';
    }

    var submitButton = `<button type="button" onclick="submitSudoku()">Resolver!</button>`;
    var clearButton = `<button type="button" onclick="clearTable()">Limpar!</button>`;

    

    content += 
    `
    <form>
    
    ${inputs} 
    ${submitButton}
    ${clearButton}

    </form>
    `;
    //
    return content;  
};

var getHtml = (bodyContent, scriptTag) => {

    console.log("getSudokuHtml");

    var fullHtml =  
    `
    <html lang="en">
    <head>
      <meta charset="utf-8">
    
      <title>Sudoku</title>
      <meta name="description" content="Sudoku-Solver">
      <meta name="author" content="Plinio">
    </head>
    
    <body>
      ${bodyContent}

      ${scriptTag}

    </body>
    </html>
    `;
    console.log(typeof fullHtml);
    return fullHtml;
};

module.exports = {

    getPageSudoku:  () => {
        return getHtml(getBody(), getScript());
    }
    
}