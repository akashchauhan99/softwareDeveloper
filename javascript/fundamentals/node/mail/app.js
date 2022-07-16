const sgMail = require('@sendgrid/mail')

const API_KEY = process.env.API_KEY

sgMail.setApiKey(API_KEY)

const message = {
   to: 'akash.chauhan@test.com',
   from: 'chauhanakash4596@gmail.com',
   subject: 'Hello Testing send grid mail',
   text: 'Hello',
   html: '<h1>Hello from Send Grid</h1>'
}

sgMail
   .send(message)
   .then((response) => {
      console.log('Email sent....\n', response)
   })
   .catch((err) => {
      console.log(err.message)
   })
