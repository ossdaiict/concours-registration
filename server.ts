import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import registerApi from './api/register'

dotenv.config()

const app = express()
app.use(express.json()) // JSON Payload Parser

app.use(cors())
// API
app.use('/register', registerApi)

// Serving the react client
app.use(express.static('public'))

// Connect To DB
//@ts-ignore
mongoose.connect(process.env.DB_URI, { useNewUrlParser: true })
mongoose.set('debug', true)
const db = mongoose.connection
db.on('error', console.log.bind(console, 'MongoDB Error:'))
db.on('connected', () => {
  console.log('Connected To DB!')
})

app.listen(5000, () => {
  console.log('Successfully started server at 5000...')
})
