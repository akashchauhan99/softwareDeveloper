let express = require('express')
let FCM = require('fcm-node')

const SERVER_KEY = process.env.SERVER_KEY

let app = express()

app.listen(3000, () => {
   console.log('Listening on port 3000')
})

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

//FCM end point
app.post('/fcm', async (req, res, next) => {
   try {

      let fcm = new FCM(SERVER_KEY)

      let message = {
         to: '/topics/' + req.body.topic,
         notification: {
            title: req.body.title,
            body: req.body.body,
            sound: 'default',
            'click_action': 'FCM_PLUGIN_ACTIVITY',
            'icon': 'fcm_push_icon'
         },
         data: req.body.data
      }

      console.log('message', message)

      fcm.send(message, (err, response) => {
         if (err) {
            next(err)
         } else {
            res.json(response)
         }
      })

   } catch (error) {
      next(error)
   }
})

