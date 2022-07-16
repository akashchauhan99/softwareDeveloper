const mongoose = require('mongoose')

const UserSchema = mongoose.Schema(
   {
      name: String,
      age: Number,
      email: String,
      phone: String,
      online: Boolean
   },
   { timestamps: true }
)

const User = mongoose.model('User', UserSchema)

const findAll = ()=> User.find({}).lean().exec();

const findOne = (_id) => User.findById({_id}).lean().exec();

// module.exports = mongoose.model('User', UserSchema)
module.exports = {
   findAll,
   findOne,
   model: User
}
