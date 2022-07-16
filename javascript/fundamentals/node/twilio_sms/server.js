const http = require('http')
const express = require('express')
require('dotenv').config()

const accountSid = process.env.TWILIO_ACCOUNT_SID
const authToken = process.env.TWILIO_AUTH_TOKEN

const client = require('twilio')(accountSid, authToken)
const MessagingResponse = require('twilio').twiml.MessagingResponse

const app = express()

app.post('/sms', (req, res) => {
   const twiml = new MessagingResponse()

   twiml.message('The Robots are coming! Head for the hills!')

   res.writeHead(200, { 'Content-Type': 'text/html' })
   res.send(twiml.toString())
})

http.createServer(app).listen(1337, () => {
   console.log('Express server listening on port 1337')
})
