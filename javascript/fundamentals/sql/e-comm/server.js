const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')

const app = express()

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use('/', express.static(path.join(__dirname, 'public')))

app.use('/api', require('./route/api').route)

app.listen('3000', () => {
   console.log('Server is running at http://localhost:3000')
})
