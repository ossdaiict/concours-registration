import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import registerApi from './api/register'

// Initializes dotenv
dotenv.config()

//Creating the express app
const app = express()

// JSON Payload Parser
app.use(express.json())

// CORS
app.use(cors())

// API
app.use('/register', registerApi)

// Connect to MongoDB
const dbUrl: string = process.env.DB_URL || ''
mongoose.set('useUnifiedTopology', true)
mongoose.connect(dbUrl, { useNewUrlParser: true })
mongoose.set('debug', true)
const db = mongoose.connection
db.on('error', console.log.bind(console, 'MongoDB Error:'))
db.on('connected', () => {
  console.log('Connected to MongoDB!')
})

app.listen(5000, () => {
  console.log('Successfully started server at 5000!')
})
