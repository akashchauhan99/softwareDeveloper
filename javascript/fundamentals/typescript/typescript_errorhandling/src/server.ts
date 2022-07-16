import * as mongoose from 'mongoose'
import 'dotenv/config'
import App from './app'
import PostController from './posts/post.controller'
import validateEnv from './utils/validateEnv'


const {
   MONGO_PATH,
   PORT
} = process.env

mongoose.connect(`${MONGO_PATH}`).then(() => {
   console.log('Successfully Connected with database')
}).catch((err) => {
   console.log('Error with database ' + err);

})

validateEnv()

const app = new App([
   new PostController()
])

app.listen()