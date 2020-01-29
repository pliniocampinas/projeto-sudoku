const http = require('http')
const https = require('https')
const port = 3000
const ip = 'localhost'

const server = http.createServer((req, res) => {
  const responses = []
  responses['/'] = '<h1>Home</h1>'
  responses['/inscreva-se'] = '<h1>Inscreva-se</h1>'
  responses['/local'] = '<h1>Local</h1>'
  responses['/contato'] = '<h1>Contato</h1>'
  responses['/naoExiste'] = '<h1>URL sem resposta definida!</h1>'


  https.get('https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY', (resp) => {
    let data = '';
  
    // A chunk of data has been recieved.
    resp.on('data', (chunk) => {
      data += chunk;
    });
  
    // The whole response has been received. Print out the result.
    resp.on('end', () => {
      console.log(JSON.parse(data).explanation);

      // JSON.parse(data).explanation
      conteudo = '<h1>' + 'Imagem NASA' + '</h1>'

      conteudo += ' <img src="' + JSON.parse(data).url + '"></img>'

      // res.end(responses[req.url] || responses['/naoExiste'])
      res.end( conteudo )// || responses['/naoExiste'])

    });

    
  
  }).on("error", (err) => {
    console.log("Error: " + err.message);



  });

})

server.listen(port, ip, () => {
  console.log(`Servidor rodando em http://${ip}:${port}`)
  console.log('Para derrubar o servidor: ctrl + c');
})