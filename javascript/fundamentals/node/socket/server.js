var app = require('express')()
var mysql = require('mysql')
var http = require('http').Server(app)
var io = require('socket.io')(http)

/* Creating POOL MySQL connection.*/

var pool = mysql.createPool({
   connectionLimit: 100,
   host: 'localhost',
   user: 'root',
   password: '',
   database: 'status',
   debug: false
})

app.get('/', function (req, res) {
   res.sendFile(__dirname + '/index.html')
})

/*  This is auto initiated event when Client connects to Your Machien.  */

io.on('connection', function (socket) {
   console.log('A user is connected')
   // console.log(socket)
   socket.on('status added', function (status) {
      console.log(status)
      add_status(status, function (res) {
         console.log(res)
         if (res) {
            io.emit('refresh feed', status)
         } else {
            io.emit('error')
         }
      })
   })
})

var add_status = function (status, callback) {
   pool.getConnection(function (err, connection) {
      if (err) {
         callback(false)
         return
      }
      connection.query(
         "INSERT INTO `status` (`s_text`) VALUES ('" + status + "')",
         function (err, rows) {
            connection.release()
            if (!err) {
               callback(true)
            }
         }
      )
      connection.on('error', function (err) {
         callback(false)
         return
      })
   })
}

http.listen(3000, function () {
   console.log('Listening on 3000')
})
