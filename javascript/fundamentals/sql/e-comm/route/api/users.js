const User = require('../../model/db').User
const route = require('express').Router()

route.get('/', (req, res) => {
   // we want to send an array of all users from database
   User.findAll()
      .then((users) => {
         res.status(200).send(users)
      })
      .catch((err) => {
         res.status(500).send({
            error: 'Could not retrive users'
         })
      })
})

route.post('/', (req, res) => {
   User.create({
      name: req.body.name
   })
      .then((user) => {
         res.status(201).send(user)
      })
      .catch((err) => {
         res.status(501).send({
            error: 'Could not add new users'
         })
      })
})

// route.post('/authenticate', authenticateController.authenticate)
// app.use('/secure-api', router)

exports = module.exports = route
