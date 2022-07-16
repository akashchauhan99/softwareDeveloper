// 1.
// console.log('Hello World!!!')

// 2.
// let a = 5
// let b = 3
// let c = a + b
// console.log('The output is ', c)

// 3.
const e = require('express')
let http = require('http')
const port = 8000
const server = http.createServer(function (req, res) {
   // res.write('Welcome Back!!!')
   // res.end()

   res.writeHead(200, { 'Content-Type': 'text/html' })
   // console.log(req.url)
   if (req.url == '/') {
      res.end('Welcome Back')
   } else if (req.url == '/about') {
      res.end('Welcome Back about page')
   } else {
      res.writeHead(404, { 'Content-type': 'text/html' })
      res.end('<h1>404 Not Found</h1>')
   }
   // res.end(`Welcome!!! You are at ${req.url}`)
})

server.listen(port, () => {
   console.log(`Listening the port at ${port}`)
})

// 4.
// let express = require('express')
// let app = express()
// let port = 8000

// app.get('/', (req, res) => {
//    res.send('Hello World!')
// })

// app.listen(port, () => {
//    console.log(`Express is working on ${port}`)
// })
