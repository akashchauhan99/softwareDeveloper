const multer = require('multer')
const aws = require('aws-sdk')
const multers3 = require('multer-s3')

const { uploadFile, getFileStream } = require('./s3.bucket')

const fs = require('fs')
const util = require('util')
const unlikeFile = util.promisify(fs.unlink)

const imagePost = async (req, res, next) => {
   try {
      const file = req.file
      console.log('file', file);
      const result = await uploadFile(file)
      console.log(result);

      //delete the opload directory from server
      await unlikeFile(file.path)

      const name = req.body.name
      console.log('name', name);

      res.send({ imagePath: `/images/${result.Key}` })
   } catch (err) {
      console.log(err);
   }
}

const getImage = async (req, res, next) => {
   try {
      const key = req.params.key
      // const interestInIcon = req.query.interestInIcon
      console.log('key', key);
      const readStream = getFileStream(key)

      readStream.pipe(res)
   } catch (err) {
      console.log(err);
   }
}
module.exports = { imagePost, getImage }