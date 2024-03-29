import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import useRouter from './routes/user.route.js'
import authRouter from './routes/auth.route.js'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import listingRouter from './routes/listing.route.js'
import path from 'path'
dotenv.config()

const app = express()

mongoose
  .connect(process.env.MONGO)
  .then(() => {
  })
  .catch((err) => {
  })

const __dirname = path.resolve()


app.use(cookieParser())
//app.use(express.json());
app.listen(3000, () => {
})
app.use(bodyParser.json())
app.use('/api/user', useRouter)
app.use('/api/auth', authRouter)
app.use('/api/listing', listingRouter)

app.use(express.static(path.join(__dirname, '/client/dist')))

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'))
})

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500
  const message = err.message || 'Internal Server Error'
  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  })
})