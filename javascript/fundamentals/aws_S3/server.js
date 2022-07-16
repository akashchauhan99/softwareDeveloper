const express = require('express')

const app = express()
const bodyParser = require('body-parser');

app.get('/', (req, res) => {
   return res.send('ok')
})

const routes = require('./routes/routes')
app.use(routes)

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.listen(8080, () => console.log('Listening on port 8080'))