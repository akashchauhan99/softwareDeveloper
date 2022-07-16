const express = require('express')
const bodyparser = require('body-parser')
const path = require('path')
const app = express()

const Publishable_key = process.env.Publishable_key
const Secret_key = process.env.Secret_key


const stripe = require('stripe')(Secret_key)

const port = 3001
app.use(bodyparser.urlencoded({ extended: false }))
app.use(bodyparser.json())

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

app.get('/', function (req, res) {
   res.render('Home', {
      key: Publishable_key
   })
})

app.post('/payment', function (req, res) {
   console.log(req.body.stripeEmail)
   console.log(req.body.stripeToken)
   stripe.customers
      .create({
         email: req.body.stripeEmail,
         source: req.body.stripeToken,
         name: 'Akash Singh Chauhan',
         address: {
            line: 'ABV',
            postal_code: '110053',
            city: 'Delhi',
            state: 'Delhi',
            country: 'India'
         }
      })
      .then((customer) => {
         return stripe.charges.create({
            amount: 2500,
            description: 'Web Development Product',
            currency: 'INR',
            customer: customer.id
         })
      })
      .catch((err) => {
         res.send(err)
      })
})

app.listen(port, function (err) {
   if (err) throw err
   console.log('Server created successfully')
})
