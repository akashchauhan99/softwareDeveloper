import * as express from 'express';

import App from './app'
import PostsController from './posts/posts.controller'

const router = express.Router();


const app = new App(
   [
      new PostsController(),
   ],
   5000,
);

app.listen();