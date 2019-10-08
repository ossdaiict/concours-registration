import express from 'express'
import Registration from '../models/registration'
import sgMail from '@sendgrid/mail'
import dotenv from 'dotenv'

dotenv.config()

const router = express.Router()

const SENDGRID_API_KEY: string = process.env.SENDGRID_API_KEY || ''
const PASSWORD: string = process.env.PASSWORD || ''

sgMail.setApiKey(SENDGRID_API_KEY)

let count = 0

router.post('/', function(req, res) {
  const msg = {
    to: req.body.email,
    from: 'Concours DA-IICT 2019 <noreplydaiictconcours@gmail.com>',
    subject: '[Concours 2019] Registration Acknowledgement',
    text: `
    Hello,
  
    Greeting from the Sports Committee, DA-IICT. Thank you for registering for Concours 2019! 
    
    This mail serves as an acknowledgement of your registration for Concours 2019. Following are the details of your registration:
    
    Name: ${req.body.name}
    College/Institute name: ${req.body.collegeName}
    Accommodation: ${req.body.accommodation}
    Sports: ${req.body.sports.map(
      (sport: { label: string; cost: number; value: string }) =>
        `${sport.label}-${sport.cost}, `
    )}
    Total amount to be paid: Rs. ${
      req.body.totalCost
    } (Note: this do not include accommodation fees) 

    The payment for the same is supposed to be done within 7 days of your registration in order to confirm your participation at Concours 2019. 
    
    Check out our website for other necessary details- concours.daiict.ac.in 
          
    Note: This is an auto-reply mail, please do not reply
    
    Keep in touch with us at:
    - concours.daiict.ac.in
    - http://www.instagram.com/sportsatdaiict
    - http://www.facebook.com/ConcoursDaiict
    - daiictconcours@gmail.com
    
    Warm regards,
    Sports Committee | DA-IICT, Gandhinagar
    `,
  }

  Registration.create(req.body)
    .then(data => {
      sgMail
        .send(msg)
        .then(result => console.log('Mail sent succesfully \n'))
        .catch(err => console.log('Mail Error: \n', err.response.body.errors))
      res.status(200).send('Successfully registered')
    })
    .catch(err => {
      console.log(err)
      res.status(500).send('Something went wrong')
    })
})

router.post('/details', function(req, res) {
  console.log('aagaya request', req.body.password)
  if (req.body.password === PASSWORD && count < 100) {
    console.log('password bhi correct')
    Registration.find()
      .exec()
      .then(data => {
        res.status(200).send(data)
      })
      .catch(err => {
        console.log(err)
        res.status(500).send('')
      })
  } else count += 1
})

export default router
