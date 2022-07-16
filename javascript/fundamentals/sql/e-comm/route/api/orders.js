const Order = require('../../model/db').Order
const route = require('express').Router()

route.get('/', (req, res) => {
   Order.findAll()
      .then((product) => {
         res.status(200).send(product)
      })
      .catch((err) => {
         res.status(500).send({
            error: 'Could not retrive products'
         })
      })
})

route.post('/', (req, res) => {
   if (isNaN(req.body.price)) {
      return res.status(403).send({
         error: 'Price is not valid number'
      })
   }

   // Adding a product
   Order.create({
      userId: req.body.userId,
      name: req.body.name,
      price: parseFloat(req.body.price),
      date: req.body.date
   })
      .then((product) => {
         res.status(201).send(product)
      })
      .catch((err) => {
         res.status(501).send({
            error: 'Could not add new product'
         })
      })
})

exports = module.exports = route
