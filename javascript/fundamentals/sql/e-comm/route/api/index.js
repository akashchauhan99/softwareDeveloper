const route = require('express').Router()

route.use('/users', require('./users'))
route.use('/products', require('./products'))
route.use('/orders', require('./orders'))
route.use('/orderdetails', require('./orderDetails'))

exports = module.exports = {
   route
}
