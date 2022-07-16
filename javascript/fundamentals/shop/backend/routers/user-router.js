const express = require('express')
const { User } = require('../models/user-model')
const router = express.Router()

router.get('/', async (req, res) => {
   const userList = await User.find()

   if (!userList) {
      res.status(500).json({ success: false })
   }
   res.send(userList)
})

router.post('/', (req, res) => {
   const user = new User({
      name: req.body.name,
      image: req.body.image,
      countInStock: req.body.countInStock
   })

   user
      .save()
      .then((createdPost) => {
         res.status(201).json(createdPost)
      })
      .catch((err) => {
         res.status(500).json({
            error: err,
            success: false
         })
      })
})

module.exports = router
