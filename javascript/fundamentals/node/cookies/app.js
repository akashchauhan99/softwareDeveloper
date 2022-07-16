let express = require('express')
let cookieParser = require('cookie-parser')

let app = express()
app.use(cookieParser())

app.get('/', (req, res) => {
   res.send('Welcome to express app')
})

let user = {
   firstUser: {
      name: 'Person1',
      age: 22
   },
   secondUser: {
      name: 'Person2',
      age: 23
   }
}

function validatecookie(req, res, next) {
   const { cookies } = req
   console.log(cookies)
   next()
}

// Adding a cookie
app.get('/setuser', (req, res) => {
   // res.cookie('userData', user)

   // for expire
   res.cookie('userData', user, {
      expire: 4000 + Date.now()
   })

   res.status(200).json({ Msg: 'User data added to cookie' })
})

//Iterate users data from cookie
app.get('/getuser', validatecookie, (req, res) => {
   //shows all the cookies
   res.send(req.cookies)
})

// Deleting a cookie
app.get('/clear', validatecookie, (req, res) => {
   res.clearCookie('userData')
   res.send('Clear the cookie')
   // res.send(req.cookies)
})

const port = 8000
app.listen(port, (err) => {
   if (err) throw err
   console.log(`Server is running at port ${port}`)
})
