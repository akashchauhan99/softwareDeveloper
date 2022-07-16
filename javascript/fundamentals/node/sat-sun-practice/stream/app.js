const fs = require('fs')
const http = require('http')

const server = http.createServer()

// 1. normal way to show data
// server.on('request', (req, res) => {
//    fs.readFile('input.txt', (err, data) => {
//       if (err) return console.error(err)
//       res.end(data.toString())
//    })
// })

// server.listen(8000)

// 2. streaming way to show Data
// server.on('request', (req, res) => {
//    const rstream = fs.createReadStream('input.txt')
//    rstream.on('data', (chunkData) => {
//       res.write(chunkData)
//    })

//    rstream.on('end', () => {
//       res.end()
//    })

//    rstream.on('error', (err) => {
//       console.log(err)
//       res.end('File Not Found')
//    })
// })

// server.listen(8000)

// 3. way
server.on('request', (req, res) => {
   const rstream = fs.createReadStream('input.txt')
   rstream.pipe(res)
})

server.listen(8000)
