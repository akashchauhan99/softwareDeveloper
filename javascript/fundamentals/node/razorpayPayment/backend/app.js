const express = require('express');
const RazorPay = require('razorpay');
const bodyparser = require('body-parser');
const crypto = require('crypto');

const razorpayInstance = new RazorPay({
    key_id: process.env.key_id,
    key_secret: process.env.key_secret
});

const app = express();
app.use(bodyparser.json());
const PORT = process.env.port || 5000;

app.get('/', (req, res)=> {
    console.log('ok');
    res.json({msg: 'OK'});
});

app.post('/createOrder', (req, res) => {
    const { amount, currency, receipt, notes }= req.body;
    console.log('CreateOrder enter================', req.body)
    razorpayInstance.orders.create({ amount, currency, receipt, notes}, (err, order) => {
        if(!err){
            res.json(order);
        }
        else{
            res.send(err)
        }
    });
});

//Inside app.js
app.post('/verifyOrder',  (req, res)=>{ 
    // STEP 7: Receive Payment Data
    console.log('verifyOrder ===========', req.body)
    const {order_id, payment_id} = req.body;     
    const razorpay_signature =  req.headers['x-razorpay-signature'];
  
    // Pass yours key_secret here
    const key_secret = "7w93TO6NQh7nTjvkUgEq1Fho";     
  
    // STEP 8: Verification & Send Response to User
      
    // Creating hmac object 
    let hmac = crypto.createHmac('sha256', key_secret); 
  
    // Passing the data to be hashed
    hmac.update(order_id + "|" + payment_id);
      
    // Creating the hmac in the required format
    const generated_signature = hmac.digest('hex');
      
      
    if(razorpay_signature===generated_signature){
        res.json({success:true, message:"Payment has been verified"})
    }
    else
    res.json({success:false, message:"Payment verification failed"})
});


app.listen(PORT, ()=> {
    console.log('Server is listening on port: ', PORT);
});