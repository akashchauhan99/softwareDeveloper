const express = require('express')
const webpush = require('web-push')
const bodyParser = require('body-parser')
const path = require('path')

const app = express()

//set static
app.use(express.static(path.join(__dirname, 'clients')))

app.use(bodyParser.json())


const publicVapidKey = process.env.publicVapidKey
const privateVapidKey = process.env.privateVapidKey

webpush.setVapidDetails(
   'mailto:test@test.com',
   publicVapidKey,
   privateVapidKey
)

//subscribe route
app.post('/subscribe', (req, res) => {
   //Get pushSubscription object
   const subscription = req.body

   //send 201
   res.status(201).json(subscription)

   //create payload
   const payload = JSON.stringify({ 'title': 'push Test' })

   webpush
      .sendNotification(subscription, payload)
      .catch(err => console.log(err))
})

app.listen(5000, () => console.log('Server is running at port 5000'))