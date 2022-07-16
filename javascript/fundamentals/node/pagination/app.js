const express = require('express')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const bodyParser = require('body-parser')
const jsonParser = bodyParser.json()
const User = require('./user')

const app = express()

const db = `mongodb://localhost:27017/pagination`
mongoose
   .connect(db, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true
   })
   .then(() => console.log('Mongo DB Connected....'))

app.get('/users', async (req, res, next) => {
   const { page = 1, limit = 10 } = req.query
   try {
      const user = await User.find()
         .limit(limit * 1)
         .skip((page - 1) * limit)
         .exec()
      const count = await User.countDocuments()

      res.json({
         user,
         totalPages: Math.ceil(count / limit),
         currentPage: page
      })
   } catch (err) {
      console.error(err.message)
   }
})

app.post('/send', jsonParser, (req, res) => {
   req.body.password = bcrypt.hashSync(req.body.password, 10)
   let newUser = new User({
      username: req.body.username,
      password: req.body.password
   })

   newUser.save().then((result) => {
      console.log(result)
   })
})

app.listen(3000, function () {
   console.log('Express started on port 3000.')
})
