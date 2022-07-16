const mongoose = require('mongoose');

const url = 'mongodb://localhost:27017/jwt';



exports.connect = () => {
mongoose.connect(url, {
    useNewUrlParser : true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false, 
})
    .then(() => {
        console.log("database is connected successfully");
    })
    .catch((error) => {
        console.log("connection problem in database exiting now..");
        console.log(error);
        process.exit(1);
    });
}
