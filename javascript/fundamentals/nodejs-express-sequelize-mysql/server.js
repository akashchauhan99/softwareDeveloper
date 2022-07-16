const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

var corsOption = {
    origin: "http://localhost:8081"
};

app.use(cors(corsOption));

app.use(express.json());

app.use(express.urlencoded({extended: true}));

const {db} = require('./app/models');
db.sequelize.sync({ force: false }).then(() => {
    console.log("Drop and re-sync db.");
  }).catch((error)=>{
    console.log('error', error);
  });

app.get('/', (req, res)=>{
    res.json({message: 'Welcome to new project'});
});

const route = require('./app/routes/index');
app.use(route);
const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});