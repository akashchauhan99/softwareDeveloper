const express = require("express")
const bodyParser = require("body-parser")
const cors = require("cors")
const app = express()
app.use(cors())
app.use(bodyParser.json())

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", req.header('origin'));
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Credentials", "true");
    next();
});

const { Client } = require('@elastic/elasticsearch')
// const basicHeader = new BasicHeader("Content-type", "application/json")
// Client.restClient = Client
//     .builder(new HttpHost(url, port, scheme))
//     .setDefaultHeaders(new Header[''], {
//         basicHeader
//     })
//     .build();
// const client = new Client({ node: 'http://localhost:9200' })

const client = new Client({
    node: 'https://search-appinventiv-development-pdpcpxr5buwcsbr54byjtcriem.us-west-1.es.amazonaws.com/',
    auth: {
      username: 'appinventiv-user',
      password: 'Hjsyij&903hh'
    }
  })

app.post("/products", async (req, res) => {
    console.log('req', req.body)
    // const changeIntoString = JSON.stringify(req.body.name)
    const data = await client.index({
        index: 'products',
        body: {
            "name": req.body.name,
        }
    })
    return res.json({"message": "Indexing successful", data})
})

app.get("/products", async (req, res) => {
    const searchText = req.query.text
    const data = await client.search({
        index: "products",
        body: {
            query: {
                match: {"name": searchText}
            }
        }
    })
    return res.json(data)
})

app.listen(process.env.PORT || 3000, () => {
    console.log("connected")
})