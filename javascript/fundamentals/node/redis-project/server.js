const express = require('express');
const app = express();
 
const port = 3000;
 
const axios = require('axios');
const redis = require('redis');

const client = redis.createClient();

client.on("error", (error)=>{
    console.error(error);
});

app.get('/recipe/', async (req, res) => {
 try {
     const masterData = "coffee";
client.get(masterData, async(err, recipe)=>{
    if(recipe){
        return res.status(200).send({
            error: false,
            message: `Recipe for from the cache`,
            data: JSON.parse(recipe)
          });
    }else{
        const recipe = await axios.get(`https://apistg.janganapp.com/utilities/v1/designation/manage`); 
        client.setex(masterData, 1440, JSON.stringify(recipe.data))
        return res.status(200).send({
            error: false,
            message: `Recipe for from the cache`,
            data: recipe.data
          });
    }
});
  
 } catch (error) {
     console.log(error);
 }
});
 
app.listen(port, () => {
 console.log(`Server running on port ${port}`);
});
 
 
module.exports = app;