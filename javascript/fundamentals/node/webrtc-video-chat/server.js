const express = require('express')
const app = express()
const server = require('http').Server(app)
const { v4: uuidv4 } = require('uuid')
const io = require('socket.io')(server)

//Peer

const { ExpressPeerServer } = require('peer')
const peerServer = ExpressPeerServer(server, {
   debug: true
})

app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use('/peerjs', peerServer)

app.get('/', (req, res) => {
   res.redirect(`/${uuidv4()}`)
})

app.get('/:room', (req, res) => {
   res.render('room', {
      roomId: req.params.room,
      flag: req.query.is_paid,
      has_active_session: req.query.has_active_session
   })
})

app.get('/expired', (req, res) => {
   res.render('expired')
})

io.on('connection', (socket) => {
   console.log('connection established')
   socket.on('join-room', (roomId, userId) => {
      socket.join(roomId)
      socket.broadcast.to(roomId).emit('user-connected', userId)
      socket.on('message', (message) => {
         io.to(roomId).emit('createMessage', message)
      })
   })
})

server.listen(3000, () => {
   console.log('Running at 3000')
})
