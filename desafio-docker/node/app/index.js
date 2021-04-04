const config = {
    host: 'db',
    user: 'root',
    password: 'root',
    database:'nodedb'
};
const mysql = require('mysql')
const connection = mysql.createConnection(config)

let sql1 = "CREATE TABLE IF NOT EXISTS people (id integer not null auto_increment primary key, name varchar(30));"
connection.query(sql1)

const express = require('express');
const app = express();

app.get('/:nome', function (req, res) {
  if(req.params.nome != "favicon.ico") {
    const sql = `INSERT INTO people(name) values('${req.params.nome}')`
    connection.query(sql)
  }
  connection.query('SELECT * FROM people', (err, rows, fields) => {
    resposta = `<h1>Full Cycle Rocks!</h1>
        <ul>`
    if (!err) {
      for (i = 0; i < rows.length; i++) {
        resposta += `<li>${rows[i].name}</li>`
      }
      resposta = resposta + `</ul>`
    } else
      resposta = "erro na consulta"

    res.send(resposta)
  });
});

app.get('/', function (req, res) {
  connection.query('SELECT * FROM people', (err, rows, fields) => {
    resposta = `<h1>Full Cycle Rocks!</h1>
        <ul>`
    if (!err) {
      for (i = 0; i < rows.length; i++) {
        resposta += `<li>${rows[i].name}</li>`
      }
      resposta = resposta + `</ul>`
    } else
      resposta = "erro na consulta"

    res.send(resposta)
  });
});



app.listen(5000, () => console.log('Server is up and running'));

