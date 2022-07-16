module.exports = (app) => {
   const user = require('../controller/user.controller')

   app.post('/users', user.create)
   app.get('/users', user.findAll)
   app.get('/user/', user.findOne)
   app.put('/users/:userId', user.update)
   app.delete('/users/:userId', user.delete)
}
