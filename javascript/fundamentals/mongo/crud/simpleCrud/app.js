const express = require('express')
const body_Parser = require('body-parser')

// Configuration the database

const app = express()

app.use(body_Parser.urlencoded({ extended: true }))
app.use(body_Parser.json())

const dbconfig = require('./config/databse.config')
const moongoose = require('mongoose')

moongoose.Promise = global.Promise

// Connecting to the database
moongoose
   .connect(dbconfig.url, {
      useNewUrlParser: true
   })
   .then(() => {
      console.log('Successfully connected to the database')
   })
   .catch((err) => {
      console.log('Could not connect to the database. Exiting now...', err)
      process.exit()
   })

app.get('/', (req, res) => {
   res.json({
      message:
         'Welcome to EasyNotes application. Take notes quickly. Organize and keep track of all your notes.'
   })
})

let port = 8000
require('./app/routes/note.routes')(app)
app.listen(port, () => {
   console.log('Server is up and running on port numner ' + port)
})
