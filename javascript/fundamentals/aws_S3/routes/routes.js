const { Router } = require('express')
const s3_constroller = require('../constroller/s3')

const multer = require('multer')
const upload = multer({ dest: 'uploads/' })

const router = Router()

router.post('/images', upload.single('image'), s3_constroller.imagePost)

router.get('/images/:key', s3_constroller.getImage)

module.exports = router