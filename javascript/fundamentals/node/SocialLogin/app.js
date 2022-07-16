const auth = require('./middleware/auth.middleware')
require('dotenv').config()
require('./config/database').connect()
const express = require('express')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const User = require('./models/user.models.js')

const app = express()

app.use(express.json())

app.post('/register', async (req, res) => {
   // Our register logic starts here
   try {
      const { first_name, last_name, email, password, socialtype, typeid } =
         req.body

      //google registration
      if (socialtype == 'google') {
         if (!(email && password && first_name, typeid)) {
            res.status(400).send('google registration failed')
         }

         const alreadyregisteredgoogle = await User.findOne({ email })

         if (alreadyregisteredgoogle) {
            return res.status(409).send('google user is already registred')
         }

         googleencryptedpassword = await bcrypt.hash(password, 10)

         const googleuser = await User.create({
            first_name,
            last_name,
            email: email,
            password: googleencryptedpassword,
            socialtype: 'google',
            typeid: typeid
         })

         const token = jwt.sign(
            { googleuser_id: googleuser._id, email },
            process.env.GOOGLE_KEY,
            {
               expiresIn: '2h'
            }
         )
         googleuser.token = token

         res.status(201).json(googleuser)
      }

      //facebook registration
      if (socialtype == 'facebook') {
         if (!(email && password && typeid)) {
            res.status(400).send('facebook registration failed')
         }

         const alreadyregisteredfacebook = await User.findOne({ email })

         if (alreadyregisteredfacebook) {
            return res.status(409).send('facebook user is already registred')
         }

         facebookencryptedpassword = await bcrypt.hash(password, 10)

         const facebookuser = await User.create({
            email: email,
            password: facebookencryptedpassword,
            socialtype: 'facebook',
            typeid: typeid
         })

         const token = jwt.sign(
            { facebookuser_id: facebookuser._id, email },
            process.env.FB_ID,
            {
               expiresIn: '2h'
            }
         )
         facebookuser.token = token

         res.status(201).json(facebookuser)
      }

      // Validate user input
      if (!(email && password && first_name && last_name)) {
         res.status(400).send('All input is required')
      }

      // check if user already exist
      const oldUser = await User.findOne({ email })

      if (oldUser) {
         return res.status(409).send('User Already Exist. Please Login')
      }

      //Encrypt user password
      encryptedPassword = await bcrypt.hash(password, 10)

      const user = await User.create({
         first_name,
         last_name,
         email: email.toLowerCase(),
         password: encryptedPassword
      })

      // Create token
      const token = jwt.sign(
         { user_id: user._id, email },
         process.env.TOKEN_KEY,
         {
            expiresIn: '2h'
         }
      )
      // save user token
      user.token = token

      // return new user
      res.status(201).json(user)
   } catch (err) {
      console.log(err)
   }
})

app.post('/welcome', auth, (req, res) => {
   res.status(200).send('Welcome 🙌 ')
})

app.post('/login', async (req, res) => {
   try {
      // Get user input
      const { email, password, socialtype, typeid } = req.body

      if (socialtype == 'google' && typeid == process.env.GOOGLE_SECRET_KEY) {
         if (!(email && password)) {
            res.status(400).send(
               "google user can't be logged without email n password"
            )
         }

         const googleuser = await User.findOne({ email })

         if (
            googleuser &&
            (await bcrypt.compare(password, googleuser.password))
         ) {
            const token = jwt.sign(
               { googleuser_id: googleuser._id, email },
               process.env.GOOGLE_KEY,
               {
                  expiresIn: '2h'
               }
            )
            googleuser.token = token
            res.status(201).json(googleuser)
         }
      }

      if (
         socialtype == 'facebook' &&
         typeid == process.env.FACEBOOK_SECRET_KEY
      ) {
         if (!(email && password)) {
            res.status(400).send(
               "facebook user can't be logged without email n password"
            )
         }

         const facebookuser = await User.findOne({ email })

         if (
            facebookuser &&
            (await bcrypt.compare(password, facebookuser.password))
         ) {
            const token = jwt.sign(
               { facebookuser_id: facebookuser._id, email },
               process.env.FB_ID,
               {
                  expiresIn: '2h'
               }
            )
            facebookuser.token = token
            res.status(201).json(facebookuser)
         }
      }

      if (socialtype == 'google' && typeid != process.env.GOOGLE_SECRET_KEY) {
         res.status(400).send('these are not matched key')
      }
      if (
         socialtype == 'facebook' &&
         typeid != process.env.FACEBOOK_SECRET_KEY
      ) {
         res.status(400).send('these are not matched key')
      }

      // Validate user input
      if (!(email && password)) {
         res.status(400).send('All input is required')
      }
      // Validate if user exist in our database
      const user = await User.findOne({ email })

      if (user && (await bcrypt.compare(password, user.password))) {
         // Create token
         const token = jwt.sign(
            { user_id: user._id, email },
            process.env.TOKEN_KEY,
            {
               expiresIn: '2h'
            }
         )

         // save user token
         user.token = token

         // user
         res.status(200).json(user)
      }
      res.status(400).send('Invalid Credentials')
   } catch (err) {
      console.log(err)
   }
})

module.exports = app
