require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const bodyparser = require('body-parser')
const cookieParser = require('cookie-parser')

const User = require('./models/user')
const { auth } = require('./middlewares/auth')
const { rawListeners } = require('./models/user')
const { isMatch } = require('lodash')

//for database connectivity
const db = require('./config/config').get(process.env.NODE_ENV)

const app = express()

app.use(bodyparser.urlencoded({ extended: false }))
app.use(bodyparser.json())
app.use(cookieParser())

mongoose.Promise = global.Promise
mongoose.connect(
   db.DATABASE,
   {
      useNewUrlParser: true,
      useUnifiedTopology: true
   },
   function (err) {
      if (err) {
         console.log(err)
      } else {
         console.log('Database is connected')
      }
   }
)

app.get('/', function (req, res) {
   res.status(200).send('Welcome to login , sign-up api')
})

app.post('/api/register', function (req, res) {
   const newuser = new User(req.body)

   if (newuser.password != newuser.password2)
      return res.status(400).json({
         message: 'Password not match'
      })

   User.findOne({ email: newuser.email }, function (err, user) {
      if (user)
         return res.status(400).json({ auth: false, message: 'email exits' })
      newuser.save((err, doc) => {
         if (err) {
            console.log(err)
            return res.status(400).json({ auth: false, message: 'Email exits' })
         }
         newuser.save((err, doc) => {
            if (err) {
               console.log(err)
               return res.status(400).json({ success: false })
            }
            res.status(200).json({
               success: true,
               user: doc
            })
         })
      })
   })
})

app.post('/api/login', function (req, res) {
   let token = req.cookies.auth
   User.findByToken(token, (err, user) => {
      if (err) return res(err)
      if (user)
         return res.status(400).json({
            error: true,
            message: 'You are already logged in'
         })
      else {
         User.findOne({ email: req.body.email }, function (err, user) {
            if (!user)
               return res.json({
                  isAuth: false,
                  message: 'Auth Failed, email not found'
               })

            user.comparepassword(req.body.password, (err, isMatch) => {
               if (!isMatch)
                  return res.json({
                     isAuth: false,
                     message: 'Password does not match'
                  })
            })

            user.generateToken((err, user) => {
               if (err) return res.status(400).send(err)
               res.cookie('auth', user.token).json({
                  isAuth: true,
                  is: user._id,
                  email: user.email
               })
            })
         })
      }
   })
})

app.get('/api/forget-password', auth, function (req, res) {
   let token = req.cookies.auth
   let olduser = new User(req.body)
   if (olduser.newPassword != olduser.confirmPassword) {
      return res.status(400).json({
         message: 'Password not match'
      })
   } else {
      User.findOne({ email: olduser.email }, function (err, user) {
         if (!user) {
            return res.json({
               isAuth: false,
               message: 'Auth Failed, email not found'
            })
         }
         user.comparepassword(olduser.oldPassword, (err, isMatch) => {
            if (!isMatch) {
               return res.json({
                  isAuth: false,
                  message: 'Password does not match with current password'
               })
            }
         })
         user.save((err, doc) => {
            if (err) {
               console.log(err)
               return res.status(400).json({ success: false })
            }
            res.status(200).json({
               success: true,
               user: doc
            })
         })
      })
   }
})
// get logged in user
app.get('/api/profile', auth, function (req, res) {
   res.json({
      isAuth: true,
      id: req.user._id,
      email: req.user.email,
      name: req.user.firstname + req.user.lastname
   })
})

//logout user
app.get('/api/logout', auth, function (req, res) {
   req.user.deleteToken(req.token, (err, user) => {
      if (err) return res.status(400).send(err)
      res.sendStatus(200)
   })
})

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
   console.log(`app is live at ${PORT}`)
})
