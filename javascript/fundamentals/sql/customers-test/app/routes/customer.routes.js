module.exports = (app) => {
   const customers = require('../controllers/customer.controller')

   //create a new customer
   app.post('/customers', customers.create)

   //retrieve all customers
   app.get('/customers', customers.findAll)

   //retrieve a single customer with customerId
   app.get('/customers/:customerId', customers.findOne)

   // Update a Customer with customerId
   app.put('/customers/:customerId', customers.update)

   // Delete a Customer with customerId
   app.delete('/customers/:customerId', customers.delete)

   // Create a new Customer
   app.delete('/customers', customers.deleteAll)
}
