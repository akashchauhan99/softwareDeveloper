import { Schema, model } from 'mongoose'
import { compare, hash } from 'bcryptjs'
import { SECRET } from '../constants'
import { randomBytes } from 'crypto'
import { sign } from 'jsonwebtoken'
import { pick } from 'lodash'
const jwt = require('jsonwebtoken')

const UserSchema = new Schema(
   {
      name: {
         type: String,
         required: true
      },
      username: {
         type: String,
         required: true
      },
      email: {
         type: String,
         required: true
      },
      password: {
         type: String,
         required: true
      },
      verified: {
         type: Boolean,
         default: false
      },
      verificationCode: {
         type: String,
         required: false
      },
      resetPasswordToken: {
         type: String,
         required: false
      },
      resetPasswordExpiresIn: {
         type: Date,
         required: false
      },
      token: {
         type: String
      }
   },
   { timestamps: true }
)

UserSchema.pre('save', async function (next) {
   let user = this
   if (!user.isModified('password')) return next()
   user.password = await hash(user.password, 10)
   next()
})

UserSchema.methods.comparePassword = async function (password) {
   return await compare(password, this.password)
}

UserSchema.methods.generateJWT = async function () {
   let payload = {
      username: this.username,
      email: this.email,
      name: this.name,
      id: this._id
   }
   return await sign(payload, SECRET, { expiresIn: '1 day' })
}

//Generate Token
UserSchema.methods.generateToken = async function () {
   let user = this
   // let payload = {
   //    username: this.username,
   //    email: this.email,
   //    name: this.name,
   //    id: this._id
   // }
   // let token = sign(payload.toHexString(), SECRET)
   // user.token = token
   // user.save(function (err, user) {
   //    if (err) return cb(err)
   //    cb(null, user)
   // })
   // return token
   let payload = {
      username: this.username,
      email: this.email,
      name: this.name,
      id: this._id
   }
   let token = await sign(payload, SECRET, { expiresIn: '1 day' })
   user.token = await token
   user.save(function (err, user) {
      if (err) return err
   })
   return await token
}

// find by token
UserSchema.statics.findByToken = function (token, cb) {
   let user = this
   jwt.verify(token, SECRET, function (err, decode) {
      user.findOne({ _id, decode, token: token }, function (err, user) {
         if (err) return cb(err)
         cb(null, user)
      })
   })
}

UserSchema.methods.generatePasswordReset = function () {
   this.resetPasswordExpiresIn = Date.now() + 36000000
   this.resetPasswordToken = randomBytes(20).toString('hex')
}

UserSchema.methods.getUserInfo = function () {
   return pick(this, ['_id', 'username', 'email', 'name', 'verified'])
}

//delete token
UserSchema.methods.deleteToken = function (token, cb) {
   let user = this
   user.update({ $unset: { token: 1 } }, function (err, user) {
      if (err) return console.log(err)
      // cb(null, user)
   })
}
const User = model('users', UserSchema)
export default User
