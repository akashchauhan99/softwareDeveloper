const express = require('express')
const bodyParser = require('body-parser')
const nunjucks = require('nunjucks')

const app = express()
const port = 3000
const router = express.Router()

const STRIPE_API = require('./api/stripe-functions')

app.set('view engine', 'html')
app.engine('html', nunjucks.render)
nunjucks.configure('views', { noCache: true })

app.use(express.static(__dirname))
app.use('/styles', express.static('styles'))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use('/', router)

router.get('/customerView', (req, res) => {
   STRIPE_API.getAllProductsAndPlans().then((products) => {
      products = products.filter((product) => {
         return product.plans.length > 0
      })
      res.render('customerView.html', { products: products })
   })
})

router.post('/signUp', (req, res) => {
   let product = {
      name: req.body.productName
   }

   let plan = {
      id: req.body.planId,
      name: req.body.planName,
      amount: req.body.planAmount,
      interval: req.body.planInterval,
      interval_count: req.body.planIntervalCount
   }

   res.render('signup.html', { product: product, plan: plan })
})

app.listen(port, () => {
   console.log('Server is running at port', port)
})
