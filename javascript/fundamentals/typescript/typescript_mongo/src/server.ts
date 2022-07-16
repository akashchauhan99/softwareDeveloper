import * as mongoose from 'mongoose'
import 'dotenv/config'
import App from './app'
import PostController from './post/post.controller'
import validateEnv from './utils/validateEnv'
import AuthenticationController from './authentication/authentication.controller'
import UserController from './user/user.controller'
import ReportController from './report/report.controller'

// import { createConnection } from 'typeorm'
// import config from './ormconfig'


// const {
//    MONGO_PATH,
//    PORT
// } = process.env

// mongoose.connect(`${MONGO_PATH}`).then(() => {
//    console.log('Successfully Connected with database')
// }).catch((err) => {
//    console.log('Error with database ' + err);

// })

validateEnv();

const app = new App([
   new PostController(),
   new AuthenticationController(),
   new UserController(),
   new ReportController(),
])

app.listen()