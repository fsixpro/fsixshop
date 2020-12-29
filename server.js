import express from 'express'
import path from 'path'
import dotenv from 'dotenv'
import color from 'colors'
import Db from './db.js'
import cors from 'cors'
import morgan from 'morgan'
import productRoute from './routes/productRoute.js'
import userRoute from './routes/userRoute.js'
import orderRoute from './routes/orderRoute.js'
import uploadRoute from './routes/uploadRoute.js'
const app = express()

dotenv.config()
Db()
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}
app.use(cors())
app.use(express.json())

app.use('/api/products', productRoute)
app.use('/api/user', userRoute)
app.use('/api/order', orderRoute)
app.use('/api/upload', uploadRoute)
const __dirname = path.resolve()
app.use('/uploads', express.static(path.join(__dirname, '/uploads')))

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '/client/build')))

  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  )
} else {
  app.get('/', (req, res) => {
    res.send('API is running....')
  })
}

const PORT = process.env.PORT
app.listen(5000, () =>
  console.log(
    `server running in ${process.env.NODE_ENV} mode on port ${PORT}`.blue
      .underline
  )
)
