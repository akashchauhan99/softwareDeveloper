var express = require('express');
const mysql = require('mysql');

var app = express();

app.get('/', function (req, res) {
  res.send('Hello World!'); // This will serve your request to '/'.
});

app.listen(8000, function () {
  console.log('Example app listening on port 8000!');
 });
// const connection = mysql.createConnection({
//   host: 'localhost',
// //   user: 'phpmyadmin',
// //   password: 'akash@AV1',
//   database: 'test'
// });
// connection.connect((err) => {
//   if (err) throw err;
//   console.log('Connected!');
// });

app.use(function(req, res, next){
    res.locals.connection = mysql.createConnection({
        host: 'localhost',
        user: '',
        password: '',
        database: 'test'
    });
    res.locals.connection.connect();
    next();
});

// app.use('/', index);
const users = require('./users');
app.use('api/v1/users', users);