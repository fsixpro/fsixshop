import express from 'express'
import dotenv from 'dotenv'
dotenv.config()
import cloud from 'cloudinary'
import Utility from '../utils/Utility.js'
const util = new Utility()
const cloudinary = cloud.v2
// import path from 'path'
// import multer from 'multer'
const router = express.Router()
const cloudConfig = {
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
}
cloudinary.config(cloudConfig)

// const storage = multer.diskStorage({
//   destination(req, file, cb) {
//     cb(null, 'uploads/')
//   },
//   filename(req, file, cb) {
//     cb(
//       null,
//       `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
//     )
//   },
// })
// const checkFileType = (file, cb) => {
//   const fileTypes = /jpg|jpeg|png/
//   const extname = fileTypes.test(path.extname(file.originalname).toLowerCase())
//   const mimetype = fileTypes.test(file.mimetype)
//   if (extname && mimetype) {
//     return cb(null, true)
//   } else {
//     cb('images only')
//   }
// }
// const upload = multer({
//   storage,
//   fileFilter: function (req, file, cb) {
//     checkFileType(file, cb)
//   },
// })

router.post('/', async (req, res) => {
  try {
    const { imageURI } = req.body
    const uploadResponse = await cloudinary.uploader.upload(String(imageURI), {
      upload_preset: 'fsixshop',
    })
    console.log(uploadResponse)
    return util.successResponse(res, 200, uploadResponse)
  } catch (error) {
    console.log('from here', error)
    return util.failureResponse(res, 500, 'server error')
  }
})
export default router
