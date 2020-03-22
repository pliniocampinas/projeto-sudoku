// import axios from 'axios';

function submitSudoku() {
    document.querySelector(".container-resultados").innerHTML = '';
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
    var inputs = document.querySelectorAll(".casa-tabuleiro");

    inputs.forEach((input, index) => {
        input.value = 0;
    });
};

function createTable() {

    tdStyle = 'margin: 2px; max-width: 30px;';
    inputStyle = 'width: 25px;';
    var n = 1;
    var inputs = '';
    for (var i = 0; i < 9; i++) {
        inputs += '<tr>';
        for (var j = 0; j < 9; j++) {
            inputs += 
            `
            <td style = "${tdStyle}">
            <input type="number" 
                   class = "casa-tabuleiro" 
                   id="${n}"  
                   style = "${inputStyle}"
                   value = 0>
            </td>
            `;
            if(j == 2 || j == 5)
                inputs += `<td style = "${tdStyle} background-color: black;"> X </td>`;
            n++;
        }
        inputs += '</tr>';
        if(i == 2 || i == 5) {
            inputs += '<tr>';
            for(var z = 0; z < 11; z++)
                inputs += `<td style="height: 10px; background-color: black; "></td>`;
            inputs += '</tr>';
        }
    }

    var table = 
    `
        <table style="border: 1px solid black; padding: 4px; background-color: black;"> 
            ${inputs}    
        </table>
    `;
    document.querySelector(".container-tabuleiro").innerHTML = table;

};

function createResultTable(linearTable, n_result) {

    var tdStyle = 'margin: 2px; width: 30px; border: 1px solid black;';
    var index = 0;
    var table_content = '';
    for (var i = 0; i < 9; i++) {
        table_content += '<tr>';
        for (var j = 0; j < 9; j++) {
            table_content += 
            `
            <td style = "${tdStyle} 
                         ${ (j == 2 || j == 5)?'border-right:4px solid black;':''  }
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
        <table style="border: 4px solid black;" > 
            ${table_content}    
        </table>
    `;
    document.querySelector(".container-resultados").innerHTML += result_display;

};