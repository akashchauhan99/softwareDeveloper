require('dotenv').config()

const config = {
   production: {
      SECRET: process.env.SECRET,
      DATABASE: process.env.MONODB_URI
   },
   default: {
      SECRET: 'mysecretkey',
      DATABASE: 'mongodb://localhost:27017/Social-login'
   }
}

exports.get = function get(env) {
   return config[env] || config.default
}
