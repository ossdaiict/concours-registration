import express from 'express'
import Registration from '../models/registration'
import nodemailer from 'nodemailer'
require('dotenv').config()

const router = express.Router()

const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: process.env.EMAIL_ID,
    pass: process.env.EMAIL_PASS,
  },
})

router.post('/', function(req, res) {
  const sum = req.body.sports.reduce(
    (sum: number, item: any) => (sum += item.cost),
    0
  )
  const data = { ...req.body, totalCost: sum }
  Registration.create(data)
    .then(data => {
      const mailOptions = {
        from: '"Concours 2018 No Reply" <noreplydaiictconcours@gmail.com>',
        to: req.body.email,
        subject: 'Concours 2019 - Registration Acknowledgement',
        text: `Hello,

      Greeting from the Sports Committee, DA-IICT. Thank you for registering for Concours 2019! 
      
      This mail serves as an acknowledgement of your registration for Concours 2019. Following are the details of your registration:
      
      Name: ${req.body.name}
      College/Institute name: ${req.body.collegeName}
      Total amount to be paid: ${sum} (Note: this do not include accommodation fees) 
      
      The payment for the same is supposed to be done within 7 days of your registration in order to confirm your participation at Concours 2019 
      
      Check out our website for other necessary details- concours.daiict.ac.in 
            
      Note: This is an auto-reply mail, please do not reply
      
      Keep in touch with us at:
      - concours.daiict.ac.in
      - http://www.instagram.com/sportsatdaiict
      - http://www.facebook.com/ConcoursDaiict
      - daiictconcours@gmail.com
      
      Warm regards,
      Sports Committee| DA-IICT, Gandhinagar`,
      }
      transporter.sendMail(mailOptions, (err: any, info: any) => {
        if (err) console.log(err)
        else console.log('Message sent: %s', info.messageId)
      })
      res.send('Successfully registered')
    })
    .catch(err => res.send('Something went wrong'))
})

export default router

/*
const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: 'spc.daiict.noreply@gmail.com',
    pass: process.env.SPC_PASS,
  },
});

const sendConfirmationMail = (sid) => {
  const token = jwt.sign({ sid }, process.env.EMAIL_KEY, { expiresIn: '5d' }); // Generate Token
  const url = `${process.env.EMAIL_CONFIRMATION_LINK}${token}`;

  Send mail with defined transport object
  transporter.sendMail(mailOptions, (err, info) => {
    if (err) console.log(err);
    else console.log('Message sent: %s', info.messageId);
  });
};

*/
