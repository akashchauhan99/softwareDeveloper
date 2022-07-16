import { join } from 'path'
import { User } from '../models'
// import * as express from 'express'
import { randomBytes } from 'crypto'
import { DOMAIN } from '../constants'
import sendMail from '../functions/email-sender'
import Validator from '../middleswares/validator.middlesware'
import {
   AuthenticateValidations,
   RegisterValidations,
   ResetPassword,
   LoginValidation
} from '../validators'
import { isMatch } from 'lodash'
const { auth } = require('../middleswares/auth')
const cookieParser = require('cookie-parser')
const bodyparser = require('body-parser')
const express = require('express')

const app = express()

app.use(cookieParser())
app.use(bodyparser.urlencoded({ extended: false }))
app.use(bodyparser.json())

const router = express.Router()

/**
 * @description To create a new User Account
 * @api /users/api/register
 * @access Public
 * @type POST
 */
router.post(
   '/api/register',
   RegisterValidations,
   Validator,
   async (req, res) => {
      try {
         let { username, email } = req.body
         // Check if the username is taken or not
         let user = await User.findOne({ username })
         if (user) {
            return res.status(400).json({
               success: false,
               message: 'Username is already taken.'
            })
         }
         // Check if the user exists with that email
         user = await User.findOne({ email })
         if (user) {
            return res.status(400).json({
               success: false,
               message:
                  'Email is already registered. Did you forget the password. Try resetting it.'
            })
         }
         user = new User({
            ...req.body,
            verificationCode: randomBytes(20).toString('hex')
         })
         await user.save()
         // Send the email to the user with a varification link
         let html = `
        <div>
            <h1>Hello, ${user.username}</h1>
            <p>Please click the following link to verify your account</p>
            <a href="${DOMAIN}users/verify-now/${user.verificationCode}">Verify Now</a>
        </div>
    `
         await sendMail(
            user.email,
            'Verify Account',
            'Please verify Your Account.',
            html
         )
         return res.status(201).json({
            success: true,
            message:
               'Hurray! your account is created please verify your email address.'
         })
      } catch (err) {
         return res.status(500).json({
            success: false,
            message: 'An error occurred.'
         })
      }
   }
)

/**
 * @description To verify a new user's account via email
 * @api /users/verify-now/:verificationCode
 * @access PUBLIC <Only Via email>
 * @type GET
 */
router.get('/verify-now/:verificationCode', async (req, res) => {
   try {
      let { verificationCode } = req.params
      let user = await User.findOne({ verificationCode })
      if (!user) {
         return res.status(401).json({
            success: false,
            message: 'Unauthorized access. Invalid verification code.'
         })
      }
      user.verified = true
      user.verificationCode = undefined
      await user.save()
      return res.sendFile(
         join(__dirname, '../templates/verification-success.html')
      )
   } catch (err) {
      console.log('ERR', err.message)
      return res.sendFile(join(__dirname, '../templates/errors.html'))
   }
})

/**
 * @description To aiuthenticate an user and get auth token
 * @api /users/api/authenticate
 * @access PUBLIC
 * @type POST
 */
router.post(
   '/api/authenticate',
   AuthenticateValidations,
   Validator,
   async (req, res) => {
      try {
         let { username, password } = req.body
         let user = await User.findOne({ username })
         if (!user) {
            return res.status(404).json({
               success: false,
               message: 'Username not found.'
            })
         }
         if (!(await user.comparePassword(password))) {
            return res.status(401).json({
               success: false,
               message: 'Incorrect password.'
            })
         }
         let token = await user.generateJWT()
         return res.status(200).json({
            success: true,
            user: user.getUserInfo(),
            token: `Bearer ${token}`,
            message: 'Hurray! You are now logged in.'
         })
      } catch (err) {
         return res.status(500).json({
            success: false,
            message: 'An error occurred.'
         })
      }
   }
)

//Reset password
router.put(
   '/api/reset-password',
   ResetPassword,
   Validator,
   async (req, res) => {
      try {
         let { email } = req.body
         console.log(email)
         let user = await User.findOne({ email })
         console.log(user)
         if (!user) {
            return res.status(404).json({
               success: false,
               message: 'User not found.'
            })
         }
         user.generatePasswordReset()
         await user.save()
         let html = `
         <div>
            <h1>Hello, ${user.username}<h1>
            <p>Please click the following link to change your password</p>
            <p>If this request is not created by you then you can ignore this email.</p>
            <a href="${DOMAIN}users/reset-password-now/${user.resetPasswordToken}">Verify Now</a>
         </div>
         `
         await sendMail(
            user.email,
            'Reset Password',
            'Please click the click to reset password',
            html
         )
         return res.status(404).json({
            success: true,
            message: 'Password reset link is sent to your email'
         })
      } catch (err) {
         return res.status(500).json({
            success: false,
            message: 'An error occured.'
         })
      }
   }
)
router.get('/reset-password-now/:resetPasswordToken', async (req, res) => {
   try {
      let { resetPasswordToken } = req.params
      let user = await User.findOne({
         resetPasswordToken,
         resetPasswordExpiresIn: { $gt: Date.now() }
      })
      if (!user) {
         // throw new Error('User not found with this resetPasswordToken')
         return res.status(401).json({
            success: false,
            message: 'Password reset token is invalid or has expired.'
         })
      }
      return res.sendFile(join(__dirname, '../templates/password-reset.html'))
   } catch (err) {
      console.log('Error', err.message)
      return res.sendFile(join(__dirname, '../templates/errors.html'))
   }
})

router.post('/api/reset-password-now', async (req, res) => {
   // return res.json(req.body)
   try {
      let { resetPasswordToken, password } = req.body
      let user = await User.findOne({
         resetPasswordToken,
         resetPasswordExpiresIn: { $gt: Date.now() }
      })
      if (!user) {
         // throw new Error('User not found with this resetPasswordToken')
         return res.status(401).json({
            success: false,
            message: 'Password reset token is invalid or has expired.'
         })
      }
      user.password = password
      // console.log(user)
      user.resetPasswordToken = undefined
      user.resetPasswordExpiresIn = undefined
      // console.log(user)
      await user.save()
      //Sending Conformation Email
      let html = `
         <div>
            <h1>Hello, ${user.username}<h1>
            <p>Your Password has changed successfully</p>
         </div>
         `
      await sendMail(
         user.email,
         'Reset Password Successfully',
         'Your password is changed',
         html
      )
      return res.status(200).json({
         success: true,
         message:
            'Your password reset request is complete. Login into your account with your new password.'
      })
   } catch (error) {
      console.log('Error', error.message)
      return res.status(500).json({
         success: false,
         message: 'Something went wrong.'
      })
   }
})

// router.put(
//    '/api/forget-password',
//    ResetPassword,
//    Validator,
//    async (req, res) => {
//       try {
//          let { email, password } = req.body
//          let user = User.findOne({ email })
//          if (!user) {
//             return res.status(404).json({
//                success: false,
//                message: 'User not found'
//             })
//          }
//          if (!(await user.comparePassword(password))) {
//             return res.status(401).json({
//                success: false,
//                message: 'Incorrect password.'
//             })
//          }
//          user = new User(req.body)
//          console.log(user)
//          console.log(req.body.newPassword)
//          // if (req.body.newPassword == req.body.confirmPassword) {
//          //    await user.save()
//          // }
//       } catch (err) {
//          return res.status(500).json({
//             success: false,
//             message: 'An error occurred.'
//          })
//       }
//    }
// )

// Login
// router.post('/api/login', LoginValidation, Validator, async (req, res) => {
//    try {
//       // let token = req.cookies.auth
//       let { email, password } = req.body
//       let user = await User.findOne({ email })
//       if (!user) {
//          return res.status(404).json({
//             success: false,
//             message: 'Username not found.'
//          })
//       }
//       if (!(await user.comparePassword(password))) {
//          return res.status(401).json({
//             success: false,
//             message: 'Incorrect password.'
//          })
//       }
//       let token = await user.generateToken()
//       res.cookie('token', user.token)
//       return res.status(200).json({
//          success: true,
//          // user: user.getUserInfo(),
//          // token: `Bearer ${token}`,
//          message: 'Hurray! You are now logged in.'
//       })
//    } catch (err) {
//       return res.status(500).json({
//          success: false,
//          message: 'An error occurred.'
//       })
//    }
// })

// router.get('/api/logout', function (req, res) {
//    req.user.deleteToken(req.token, (err, user) => {
//       if (err) return res.status(400).send(err)
//       res.sendStatus(200)
//    })
// })
export default router
