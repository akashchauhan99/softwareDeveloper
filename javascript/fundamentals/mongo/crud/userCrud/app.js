const express = require('express')
const bodyparser = require('body-parser')

const swaggerUI = require('swagger-ui-express')
const swaggerjsdoc = require('swagger-jsdoc')

const app = express()

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyparser.urlencoded({ extended: true }))
// parse requests of content-type - application/json
app.use(bodyparser.json())

const dbconfig = require('./config/database.config')

const mongoose = require('mongoose')
mongoose.Promise = global.Promise

//connecting to the database
mongoose
   .connect(dbconfig.url, {
      useNewUrlParser: true
   })
   .then(() => {
      console.log('Successfully connected to the database')
   })
   .catch((err) => {
      console.log('Could not connect to the databaseExiting now...', err)
      process.exit()
   })

app.get('/', (req, res) => {
   res.json({
      message: 'Welcome to Users Data Application'
   })
})

//SWAGGER DOCUMENTATION
// const swaggerAPIDoc = swaggerjsdoc({
//    swaggerDefinition: {
//       info: {
//          title: 'CRUD APP',
//          version: '1.0.0'
//       }
//    },
//    apis: ['*.js']
// })

// app.use('/swagger', swaggerUI.serve, swaggerUI.setup(swaggerAPIDoc))
// //GET
// /**
//  * @swagger
//  * /users:
//  *  get:
//  *    description: Use to request all customers
//  *    responses:
//  *      200:
//  *        description: A successful response
//  */

// //POST
// /**
//  * @swagger
//  * /users:
//  *   post:
//  *      description: It is a POST API to create users.
//  *      responses:
//  *          200:
//  *              description: Successfully created the user.
//  *          500:
//  *              description: Error occurred while creating the user.
//  *          400:
//  *              description: All Fields are required.
//  *          403:
//  *              description: Unauthorized.
//  *      parameters:
//  *          - name: name
//  *            in: formData
//  *            required: true
//  *            type: string
//  *            description: Name of the User
//  *          - name: email
//  *            in: formData
//  *            required: true
//  *            type: string
//  *            description: Email of the User
//  *          - name: age
//  *            in: formData
//  *            required: true
//  *            type: number
//  *            description: Address of the User
//  *          - name: phone
//  *            in: formData
//  *            required: true
//  *            type: string
//  *            description: Mobile Number
//  *          - name: online
//  *            in: formData
//  *            required: true
//  *            type: boolean
//  *            description: User is online or not
//  */

// /**
//  * @swagger
//  * /users/{userId}:
//  *   put:
//  *      summary: Update the User by its userId.
//  *      parameters:
//  *          - in: path
//  *            name: userId
//  *            description: User Id
//  *            type: string
//  *            required: true
//  *          - in: body
//  *            name: user
//  *            description: Details of user to update.
//  *            schema:
//  *               type: object
//  *               properties:
//  *                  name:
//  *                     type: string
//  *                  age:
//  *                     type: number
//  *                  email:
//  *                     type: string
//  *                  phone:
//  *                     type: string
//  *                  online:
//  *                     type: boolean
//  *      responses:
//  *          200:
//  *              description: Successfully updated the user.
//  *          500:
//  *              description: Error occurred while updating the user.
//  *          403:
//  *              description: Unauthorized.
//  */

// //GET SPECIFIC USERS
// /**
//  * @swagger
//  * /users/{userId}:
//  *   get:
//  *      description: It is a GET API to get a specific user.
//  *      responses:
//  *          200:
//  *              description: Successfully retrieved the user.
//  *          400:
//  *              description: Error while finding the user.
//  *      parameters:
//  *         - in: path
//  *           name: userId
//  *           required: true
//  *           description: UserId for specific user.
//  *
//  */

// /**
//  * @swagger
//  * /users/{userId}:
//  *  delete:
//  *    description: Use to delete all customers
//  *    parameters:
//  *       - in: path
//  *         name: userId
//  *         required: true
//  *         description: UserId for Specific User
//  *    responses:
//  *      200:
//  *          description: A successful delete response
//  *      400:
//  *              description: Error while finding the user.
//  */

let port = 3000
require('./app/routes/user.route')(app)
app.listen(port, () => {
   console.log('Server is up and running at port : ', port)
})
