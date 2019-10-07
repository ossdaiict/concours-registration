import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import registerApi from './api/register'
import morgan from 'morgan'
import helmet from 'helmet'

// Initializes dotenv
dotenv.config()

// Creating the express app
const app = express()

// Morgan for logging
app.use(morgan('tiny'))

// Helmet for security
app.use(helmet())

// CORS
app.use(cors())

// JSON Payload Parser
app.use(express.json())

// API
app.use('/register', registerApi)

// Connect to MongoDB
const dbUrl: string = process.env.DB_URL || ''
const dbName: string = process.env.DB_NAME || ''
mongoose.set('useUnifiedTopology', true)
mongoose.connect(dbUrl, { useNewUrlParser: true, dbName })
mongoose.set('debug', true)
const db = mongoose.connection
db.on('error', console.log.bind(console, 'MongoDB Error: \n'))
db.on('connected', () => {
  console.log('Connected to MongoDB!')
})

app.listen(5000, () => {
  console.log('Successfully started server at 5000!')
})
