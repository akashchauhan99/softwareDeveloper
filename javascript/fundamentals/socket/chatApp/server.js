const express = require('express')
const path = require('path')
const http = require('http')
const socketio = require('socket.io')
const formatMessage = require('./utils/messages')
const {
   userJoin,
   getCurrentUser,
   userLeave,
   getRoomUser
} = require('./utils/users')

const app = express()
const server = http.createServer(app)

//To configure with socket.io
const io = socketio(server)

// set static folder
app.use(express.static(path.join(__dirname, 'public')))

const botName = 'ChatCord Bot'

//for connection
io.on('connection', (socket) => {
   console.log('New user connected')
   socket.on('joinRoom', ({ username, room }) => {
      const user = userJoin(socket.id, username, room)
      socket.join(user.room)

      // for single client connect
      socket.emit('message', formatMessage(botName, 'Welcome to Demo Chat'))

      // broadcast when a user connects
      socket.broadcast
         .to(user.room)
         .emit(
            'message',
            formatMessage(botName, `${user.username} has joined the chat`)
         )

      io.to(user.room).emit(`roomUsers`, {
         room: user.room,
         users: getRoomUser(user.room)
      })
   })

   // Listen for chat message
   socket.on('chatMessage', (msg) => {
      const user = getCurrentUser(socket.id)
      // console.log(msg)
      io.to(user.room).emit('message', formatMessage(user.username, msg))
   })

   // Runs when user disconnect
   socket.on('disconnect', () => {
      const user = userLeave(socket.id)

      if (user) {
         io.to(user.room).emit(
            'message',
            formatMessage(botName, `${user.username} has left the chat`)
         )

         // Send users and room info
         io.to(user.room).emit('roomUsers', {
            room: user.room,
            users: getRoomUser(user.room)
         })
      }
   })
})

server.listen(3000, () => {
   console.log('Server is running at port 3000')
})
