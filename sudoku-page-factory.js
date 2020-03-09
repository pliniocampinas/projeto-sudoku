
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
// import axios from 'axios'

var getScript = () => {

    var script = 
    `
    <script src="https://unpkg.com/axios/dist/axios.min.js"></script>
    
    <script>

    function submitSudoku() {
            
        var valores = []; 
        var n = 1;
        for (var i = 0; i < 9; i++) {
            for (var j = 0; j < 9; j++) {

                var x = document.getElementById(n);
                valores.push(x.value);
                n++;
            }
        }
        var config = {
            headers: {'X-My-Custom-Header': 'Header-Value'}
          };
        console.log(valores);
        axios.post(
            '/vetor-tabuleiro',
            valores,
            config
        );
        
    };

    function clearTable() {
        var n = 1;
        var inputs = document.querySelectorAll(".casa-tabuleiro");

        inputs.forEach((input, index) => {
            input.value = 0;
        });
    };

    </script>
    `;



    return script;
};

var getInput = (nId, inputClass, inputStyle) => {
    return `<input ${inputClass} 
            ${inputStyle} 
            type="number" 
            id="${nId}" >`;
}

var getBody = () => {

    var content = '<h1> Tabuleiro Sudoku </h1>';
    var tabuleiro = '<div style="background-color:grey; display:flex;">';
    var inputClass = `class="casa-tabuleiro"`;
    var inputStyle = `style="max-width: 10%; width: 30px;"`;
    var n = 1;
    var nSetor = 1;
    for (var i = 0; i < 9; i++) {
        for (var j = 0; j < 9; j++) {
            // inputs += '<input class="casa-tabuleiro" style="max-width: 10%; width: 30px;" type="number" id="' + n + '">';
            inputStyle = `style="max-width: 10%; width: 30px; `
            if((j % 3) == 2) {
                inputStyle +=  `margin-right: 4px; `;
            }
            
            if((i % 3) == 2) {
                inputStyle +=  `margin-bottom: 4px; `;
            }

            inputStyle += `"`;
            tabuleiro += getInput(n, inputClass, inputStyle);
            n++;
        }
        tabuleiro += '<br>';
    }

    tabuleiro += '</div>';

    var submitButton = `<button type="button" onclick="submitSudoku()">Resolver!</button>`;
    var clearButton = `<button type="button" onclick="clearTable()">Limpar!</button>`;

    content += 
    `
    <form>
    
    ${tabuleiro} 
    ${submitButton}
    ${clearButton}

    </form>
    `;
    //
    return content;  
};

var getHtml = (bodyContent, scriptTag) => {

    var fullHtml =  
    `
    <html lang="en">
    <head>
      <meta charset="utf-8">
    
      <title>Sudoku</title>
      <meta name="description" content="Sudoku-Solver">
      <meta name="author" content="Plinio">
    </head>
    
    <body onload="clearTable()">
      ${bodyContent}

      ${scriptTag}

    </body>
    </html>
    `;
    return fullHtml;
};

module.exports = {

    getPage:  () => {
        return getHtml(getBody(), getScript());
    }
    
}