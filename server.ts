import express from 'express'

const app = express()

// Serving the react client
app.use(express.static('public'))

app.listen(5000, () => {
  console.log('Successfully started server at 5000...')
})
