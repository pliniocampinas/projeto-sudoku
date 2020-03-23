// import axios from 'axios';

function submitSudoku() {
    document.querySelector(".results-container").innerHTML = '';
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
    )
    .then( (response) => {
        // console.log("response");
        // console.log(response.data);
        // console.log(typeof response.data);
        var parsedData;
        response.data.results.forEach((result, index) => {
            parsedData = result.flat();
            createResultTable(parsedData, index + 1);
        });
        // console.log(parsedData);
    });
    
};

function clearTable() {
    var n = 1;
    var inputs = document.querySelectorAll(".table-container input");

    inputs.forEach((input, index) => {
        input.value = 0;
    });
};

function createTable() {
    var n = 1;
    var inputs = '';
    for (var i = 0; i < 9; i++) {
        inputs += '<tr>';
        for (var j = 0; j < 9; j++) {
            inputs += 
            `
            <td>
            <input style = "${ (j == 2 || j == 5)?'border-right:4px solid black;':''  }
                            ${ (i == 2 || i == 5)?'border-bottom:4px solid black;':''  }"
                   type="number" 
                   id="${n}"  
                   value = 0>
            </td>
            `;
            n++;
        }
        inputs += '</tr>';
    }

    var table = 
    `
        <table> 
            ${inputs}    
        </table>
    `;
    document.querySelector(".table-container").innerHTML = table;

};

function createResultTable(linearTable, n_result) {

    var index = 0;
    var table_content = '';
    for (var i = 0; i < 9; i++) {
        table_content += '<tr>';
        for (var j = 0; j < 9; j++) {
            table_content += 
            `
            <td style = "${ (j == 2 || j == 5)?'border-right:4px solid black;':''  }
                         ${ (i == 2 || i == 5)?'border-bottom:4px solid black;':''  }">
                ${linearTable[index]}
            </td>
            `;
            index++;
        }
        table_content += '</tr>';
    }

    var result_display = 
    `
        <hr>
        <h3> Resultado ${n_result} </h1>
        <hr>
        <table> 
            ${table_content}    
        </table>
    `;
    document.querySelector(".results-container").innerHTML += result_display;

};