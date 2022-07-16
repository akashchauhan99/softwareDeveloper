const express = require('express')
const bodyparser = require('body-parser')
const mongoose = require('mongoose')
require('dotenv/config')
const morgan = require('morgan')
const cors = require('cors')

app.use(cors())
app.options('*', cors())

const app = express()

const productRouter = require('./routers/product-router')
const orderRouter = require('./routers/order-router')
const categoryRouter = require('./routers/category-router')
const userRouter = require('./routers/user-router')

app.use(bodyparser.json())
app.use(morgan('tiny'))

const url = process.env.MONGO_URL
mongoose.connect(
   url,
   {
      useNewUrlParser: true,
      dbName: 'shop'
   },
   (err) => {
      if (!err) {
         console.log('MongoDB Connection Succeeded.')
      } else {
         console.log('Error in DB connection : ' + err)
      }
   }
)

app.use('/product', productRouter)
app.use('/user', userRouter)
app.use('/order', orderRouter)
app.use('/category', categoryRouter)

app.listen(3000, () => {
   console.log('Server is running at port 8000')
})
