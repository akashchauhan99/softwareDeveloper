require('dotenv').config()

const accountSid = process.env.TWILIO_ACCOUNT_SID
const authToken = process.env.TWILIO_AUTH_TOKEN
// const accountSid = 'ACb9a26a783c6ff65f8696bee49b12e049'
// const authToken = '5d9d3f0eca7e3c298d3a1f70bdec7002'

const client = require('twilio')(accountSid, authToken)

client.messages
   .create({
      // from: '+18727135413',
      from: '+18727135413',
      to: process.env.MY_PHONE_NUMBER,
      body: 'This message is a test message from twilio.'
   })
   .then((message) => console.log(message.sid))
