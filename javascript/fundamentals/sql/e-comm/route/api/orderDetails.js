const OrderDetail = require('../../model/db').OrderDetail
const route = require('express').Router()

route.get('/', (req, res) => {
   OrderDetail.findAll()
      .then((orderdetails) => {
         res.status(200).send(orderdetails)
      })
      .catch((err) => {
         res.status(500).send({
            error: 'Could not retrive products'
         })
      })
})

route.post('/', (req, res) => {
   // Adding a product
   OrderDetail.create({
      name: req.body.name,
      orderid: req.body.orderid
   })
      .then((orderdetails) => {
         res.status(201).send(orderdetails)
      })
      .catch((err) => {
         res.status(501).send({
            error: 'Could not add new product'
         })
      })
})

exports = module.exports = route
