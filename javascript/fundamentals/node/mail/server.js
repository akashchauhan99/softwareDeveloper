const nodemailer = require('nodemailer')

//Testing Email platform provided by nodemailer
// async function main() {
//    let testAccount = await nodemailer.createTestAccount()
//    let transporter = nodemailer.createTransport({
//       host: 'smtp.ethereal.email',
//       port: 587,
//       secure: false,
//       auth: {
//          user: testAccount.user,
//          pass: testAccount.pass
//       }
//    })
//    let info = await transporter.sendMail({
//       from: '<foo@example.com>',
//       to: 'email@test.com',
//       subject: 'Email Testing',
//       text: 'Hello world',
//       html: '<b>Hello WOrld</b>'
//    })
//    console.log('Message sent: %s', info.messageId)

//    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info))
// }

// main().catch(console.error)

// https://myaccount.google.com/lesssecureapps Enable this  after login

let transporter = nodemailer.createTransport({
   service: 'gmail',
   auth: {
      user: 'email@gmail.com',
      pass: '---Password---'
   }
})

let mailOptions = {
   from: 'email@gmail.com',
   to: 'email@gmail.com',
   subject: 'Sending testing email by node mailer',
   text: 'That is the node mailer testing email.'
}

transporter.sendMail(mailOptions, function (err, info) {
   if (err) {
      console.error(err)
   } else {
      console.log('Email Sent: ' + info.response)
   }
})
