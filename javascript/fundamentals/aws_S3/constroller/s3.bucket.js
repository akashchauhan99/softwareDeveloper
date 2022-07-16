// It takes client of s3 
const S3 = require('aws-sdk/clients/s3')
const fs = require('fs')

require('dotenv').config()

const bucketName = process.env.AWS_BUCKET_NAME
const region = process.env.AWS_BUCKET_REGION
const accessKeyId = process.env.AWS_ACCESS_KEY
const secretAccessKey = process.env.AWS_SECRET_KEY

const s3 = new S3({
   region,
   accessKeyId,
   secretAccessKey
})

// uploads a file to s3
function uploadFile(file) {
   const folder_name = 'interestInIcon'
   const fileStream = fs.createReadStream(file.path)

   const imageData = `${folder_name}/${file.filename}`
   const uploadParams = {
      Bucket: `${bucketName}/interestInIcon`,
      Body: fileStream,
      Key: file.filename
   }

   return s3.upload(uploadParams).promise()
}

//download a file from s3
function getFileStream(filekey) {
   const downloadParams = {
      Key: filekey,
      Bucket: `${bucketName}/interestInIcon`
   }

   return s3.getObject(downloadParams).createReadStream()
}

module.exports = { uploadFile, getFileStream }