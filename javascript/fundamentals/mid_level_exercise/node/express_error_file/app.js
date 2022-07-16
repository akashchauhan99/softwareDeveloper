const express = require('express')
const app = express()
const path = require('path')

const port = 8080

app.use('/html', express.static(path.join(__dirname, '/html_file')))
var file = path.join(__dirname, '/html_file')

app.get('/', function (req, res) {
   res.send('Hello World')
})

app.get('/test', function (req, res) {
   // res.sendFile(path.join(file, 'test.html'))
   res.sendFile(__dirname + '/html_file/test.html')
})

app.get('*', function (req, res) {
   res.sendFile(path.join(file, 'error.html'))
})

app.listen(port, function (err) {
   if (err) {
      console.log('Error while starting server')
   } else {
      console.log(`Server has been started at ${port}`)
   }
})
