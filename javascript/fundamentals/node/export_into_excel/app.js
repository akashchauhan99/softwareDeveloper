const mongoose = require('mongoose')
const express = require('express')
const faker = require('faker')
const path = require('path')
const dataModel = require('./models/data')
const XLSX = require('xlsx')
const bodyparser = require('body-parser')
const data = require('./models/data')

//connect to db
mongoose
   .connect('mongodb://localhost:27017/export-data-into-excel', {
      useNewUrlParser: true
   })
   .then(() => console.log('connected to db'))
   .catch((err) => console.log('error in connection', err))

//init app
const app = express()
app.use(bodyparser({ extended: false }))
app.use(bodyparser.json())
//set the template engine
// app.set('view engine', 'ejs')

//set the static folder path
app.use(express.static(path.resolve(__dirname, 'public')))

//To get data from mongo db
app.get('/getdata', async (req, res) => {
   const { page = 1, limit = 10 } = req.query
   try {
      const data = await dataModel
         .find()
         .limit(limit * 1)
         .skip((page - 1) * limit)
         .exec()
      const count = await dataModel.countDocuments()

      res.json({
         data,
         totalPages: Math.ceil(count / limit),
         currentPage: page
      })
   } catch (err) {
      console.error(err.message)
   }
})

// Post data into mongo
app.post('/postdata', async (req, res) => {
   res.setHeader('Content-Type', 'application/json')
   res.setHeader('Content-Type', 'text/html')
   let userData = new dataModel({
      firstname: req.body.firstname,
      lastname: req.body.lastName,
      phno: req.body.phoneNumber,
      city: req.body.city,
      state: req.body.state,
      country: req.body.country
   })

   userData
      .save()
      .then((result) => {
         console.log(result)
      })
      .catch((err) => {
         res.status(500).send({
            message:
               err.message || 'Some error occurred while creating the Note'
         })
      })
})

// download data from mongo
app.get('/save', async (req, res) => {
   const { page = 1, limit = 10 } = req.query
   try {
      let wb = XLSX.utils.book_new() // new workbook
      const data = await dataModel
         .find((err, data) => {
            if (err) {
               console.log(err)
            } else {
               let temp = JSON.stringify(data)
               temp = JSON.parse(temp)
               let ws = XLSX.utils.json_to_sheet(temp)
               let down = __dirname + '/exportData.xlsx'
               XLSX.utils.book_append_sheet(wb, ws, 'sheet1')
               XLSX.writeFile(wb, down)
               res.download(down)
            }
         })
         .limit(limit * 1)
         .skip((page - 1) * limit)
         .exec()
      const count = await dataModel.countDocuments()

      res.json({
         data,
         totalPages: Math.ceil(count / limit),
         currentPage: page
      })
   } catch (err) {
      console.error(err.message)
   }
})

app.get('/filter', async (req, res) => {
   const { page = 1, limit = 10 } = req.query
   try {
      let wb = XLSX.utils.book_new() // new workbook
      // const filtereduser = { firstname: /test/ }
      const filtereduser = { city: /Delhi/ }
      // console.log(filtereduser)

      dataModel
         .find(filtereduser, function (err, data) {
            // console.log(filtereduser)
            if (err) {
               console.log(err)
            } else {
               let temp = JSON.stringify(data)
               temp = JSON.parse(temp)
               let ws = XLSX.utils.json_to_sheet(temp)
               let down = __dirname + '/filterData.xlsx'
               XLSX.utils.book_append_sheet(wb, ws, 'sheet1')
               XLSX.writeFile(wb, down)
               res.download(down)
            }
         })
         .limit(limit * 1)
         .skip((page - 1) * limit)
         .exec()

      const count = await dataModel.find(filtereduser).countDocuments()
      console.log(count)

      console.log(dataModel.aggregate([{ $unwind: '$city' }]))

      res.json({
         // data,
         count,
         totalPages: Math.ceil(count / limit),
         currentPage: page
      })
   } catch (err) {
      console.error(err.message)
   }
})

let port = process.env.PORT || 3000
app.listen(port, () => console.log('server run at ' + port))
