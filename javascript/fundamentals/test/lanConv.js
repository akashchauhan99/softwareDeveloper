const translate = require('google-translate-api');
const express = require('express')
const app = express()
translate('I spea Dutch!', { from: 'en', to: 'hi' }).then(res => {
   console.log(res);
   //=> Ik spreek Nederlands!
   // console.log(res.from.text.autoCorrected);
   //=> true
   // console.log(res.from.text.value);
   //=> I [speak] Dutch!
   // console.log(res.from.text.didYouMean);
   //=> false
}).catch(err => {
   console.error(err);
});

app.listen(3000, () => {
   console.log('Express server started at port : 3000')
})