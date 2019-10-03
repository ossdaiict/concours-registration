import express from 'express'
import Registration from '../models/registration'
require('dotenv').config()

const router = express.Router()

const send = require('gmail-send')({
  user: process.env.EMAIL_ID,
  pass: process.env.EMAIL_PASS,
  subject: 'Successfully Registered for Concours 2019',
  html: `   <div>
        <h2>Concours 2019</h2>
        <br />
        <p>
          You have been successfully registered for Concours 2019. To confirm your
          registration make sure that the registration payment is done within 7
          days.
        </p>
        <br />
        <div>
          Please find the rulebook at our
          <a href="http://concours.daiict.ac.in">website</a>
        </div>
      </div>`,
})

router.post('/', function(req, res) {
  const sum = req.body.sports.reduce(
    (sum: number, item: any) => (sum += item.cost),
    0
  )
  const data = { ...req.body, totalCost: sum }
  Registration.create(data)
    .then(data => {
      send({ to: req.body.email })
      res.send('Successfully registered')
    })
    .catch(err => res.send('Something went wrong'))
})

export default router
