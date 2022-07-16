// ------->>>> 1. Database creation
// let MongoClient = require('mongodb').MongoClient
// let url = 'mongodb://localhost:27017/mydb'

// MongoClient.connect(url, function (err, db) {
//    if (err) throw err
//    console.log('Databse Created')
//    db.close()
// })

// ------->>>> 2.Collection creation
// let MongoClient = require('mongodb').MongoClient
// let url = 'mongodb://localhost:27017/'

// MongoClient.connect(url, function (err, db) {
//    if (err) throw err
//    // console.log('Databse Created')
//    let dbo = db.db('mydb')
//    dbo.createCollection('customer', function (err, res) {
//       if (err) throw err
//       console.log(`${res} Collection created`)
//       db.close()
//    })
// })

// ------->>>> 3. Insert into collection
// ------->>>> Single Data
// let MongoClient = require('mongodb').MongoClient
// let url = 'mongodb://localhost:27017/'

// MongoClient.connect(url, function (err, db) {
//    if (err) throw err
//    let dbo = db.db('mydb')
//    let myobj = { name: 'test', address: 'Noida Sector 59' }
//    dbo.collection('customers').insertOne(myobj, function (err, res) {
//       if (err) throw err
//       console.log('1 Document Inserted')
//       db.close()
//    })
// })

// ------->>>> Multiple Data
// let MongoClient = require('mongodb').MongoClient
// let url = 'mongodb://localhost:27017/'

// MongoClient.connect(url, function (err, db) {
//    if (err) throw err
//    let dbo = db.db('mydb')
//    let myobj = [
//       { name: 'John', address: 'Highway 71' },
//       { name: 'Peter', address: 'Lowstreet 4' },
//       { name: 'Amy', address: 'Apple st 652' },
//       { name: 'Hannah', address: 'Mountain 21' },
//       { name: 'Michael', address: 'Valley 345' },
//       { name: 'Sandy', address: 'Ocean blvd 2' },
//       { name: 'Betty', address: 'Green Grass 1' },
//       { name: 'Richard', address: 'Sky st 331' },
//       { name: 'Susan', address: 'One way 98' },
//       { name: 'Vicky', address: 'Yellow Garden 2' },
//       { name: 'Ben', address: 'Park Lane 38' },
//       { name: 'William', address: 'Central st 954' },
//       { name: 'Chuck', address: 'Main Road 989' },
//       { name: 'Viola', address: 'Sideway 1633' },
//       { name: 'Sam', address: 'Sydney 2' }
//    ]
//    dbo.collection('customers').insertMany(myobj, function (err, res) {
//       if (err) throw err
//       console.log(`${myobj.length} Document Inserted`)
//       console.log(res.insertedCount)
//       console.log(res.insertedIds)
//       db.close()
//    })
// })

// ------->>>> 4. Find or Select
// ------->>>> Find One
// let MongoClient = require('mongodb').MongoClient
// let url = 'mongodb://localhost:27017/'

// MongoClient.connect(url, function (err, db) {
//    if (err) throw err
//    let dbo = db.db('mydb')
//    dbo.collection('customers').findOne({}, function (err, result) {
//       if (err) throw err
//       console.log(result.name)
//       db.close()
//    })
// })

// ------->>>> Find Many
// let MongoClient = require('mongodb').MongoClient
// let url = 'mongodb://localhost:27017/'

// MongoClient.connect(url, function (err, db) {
//    if (err) throw err
//    let dbo = db.db('mydb')
//    dbo.collection('customers')
//       .find({})
//       .toArray(function (err, result) {
//          if (err) throw err
//          console.log(result)
//          db.close()
//       })
// })

// ------->>>> Find Some
// let MongoClient = require('mongodb').MongoClient
// let url = 'mongodb://localhost:27017/'

// MongoClient.connect(url, function (err, db) {
//    if (err) throw err
//    let dbo = db.db('mydb')
//    dbo.collection('customers')
//       .find({}, { projection: { _id: 0 } })
//       .toArray(function (err, result) {
//          if (err) throw err
//          for (let item in result) {
//             console.log(result[item])
//             console.log(result[item].name)
//             console.log(result[item].address)
//          }
//          console.log(result.length)
//          db.close()
//       })
// })

// ------->>>> 5. Query
// let MongoClient = require('mongodb').MongoClient
// let url = 'mongodb://localhost:27017/'

// MongoClient.connect(url, function (err, db) {
//    if (err) throw err
//    let dbo = db.db('mydb')
//    let query = { address: 'Noida Sector 58' }
//    dbo.collection('customers')
//       .find(query)
//       .toArray(function (err, result) {
//          if (err) throw err
//          console.log(result)
//          db.close()
//       })
// })

// ------->>>> Filter With Regular Expressions
// let MongoClient = require('mongodb').MongoClient
// let url = 'mongodb://localhost:27017/'

// MongoClient.connect(url, function (err, db) {
//    if (err) throw err
//    let dbo = db.db('mydb')
//    let query = { address: /[0-9]/ }
//    dbo.collection('customers')
//       .find(query)
//       .toArray(function (err, result) {
//          if (err) throw err
//          console.log(result)
//          db.close()
//       })
// })

// ------->>>> 6. Sort
// let MongoClient = require('mongodb').MongoClient
// let url = 'mongodb://localhost:27017/'

// MongoClient.connect(url, function (err, db) {
//    if (err) throw err
//    let dbo = db.db('mydb')
//    let mysort = { address: 1 } //ascending
//    // let mysort = { address: -1 } // descending
//    dbo.collection('customers')
//       .find()
//       .sort(mysort)
//       .toArray(function (err, result) {
//          if (err) throw err
//          console.log(result)
//          db.close()
//       })
// })

// ------->>>> 7. Delete
// ------->>>> Delete One
// let MongoClient = require('mongodb').MongoClient
// let url = 'mongodb://localhost:27017/'

// MongoClient.connect(url, function (err, db) {
//    if (err) throw err
//    let dbo = db.db('mydb')
//    let myquery = { address: 'Mountain 21' }
//    dbo.collection('customers').deleteOne(myquery, function (err, result) {
//       if (err) throw err
//       console.log(result)
//       console.log('1 document deleted')
//       db.close()
//    })
// })

// ------->>>> Delete Many
// let MongoClient = require('mongodb').MongoClient
// let url = 'mongodb://localhost:27017/'

// MongoClient.connect(url, function (err, db) {
//    if (err) throw err
//    let dbo = db.db('mydb')
//    let myquery = { address: /^Noida/ }
//    dbo.collection('customers').deleteMany(myquery, function (err, obj) {
//       if (err) throw err
//       console.log(`${obj.result} document(s) deleted`)
//       // console.log(obj.result.n)
//       db.close()
//    })
// })

// ------->>>> 8. Update
// let MongoClient = require('mongodb').MongoClient
// let url = 'mongodb://localhost:27017/'

// MongoClient.connect(url, function (err, db) {
//    if (err) throw err
//    let dbo = db.db('mydb')
//    let myquery = { address: 'Noida Sector 59' }
//    let newValues = { $set: { name: 'test', address: 'Noida' } }
//    dbo.collection('customers').updateOne(
//       myquery,
//       newValues,
//       function (err, res) {
//          if (err) throw err
//          console.log('1 Document Updated')
//          db.close()
//       }
//    )
// })

// ------->>>> Update Only Specific Fields
// let MongoClient = require('mongodb').MongoClient
// let url = 'mongodb://localhost:27017/'

// MongoClient.connect(url, function (err, db) {
//    if (err) throw err
//    let dbo = db.db('mydb')
//    let myquery = { address: 'Noida Sector 58' }
//    let newValues = { $set: { address: 'Noida Sec 58' } }
//    dbo.collection('customers').updateOne(
//       myquery,
//       newValues,
//       function (err, res) {
//          if (err) throw err
//          console.log('1 Document Updated')
//          db.close()
//       }
//    )
// })

// ------->>>> Update Many
// let MongoClient = require('mongodb').MongoClient
// let url = 'mongodb://localhost:27017/'

// MongoClient.connect(url, function (err, db) {
//    if (err) throw err
//    let dbo = db.db('mydb')
//    let myquery = { address: /^S/ }
//    let newValues = { $set: { name: 'Minnie' } }
//    dbo.collection('customers').updateMany(
//       myquery,
//       newValues,
//       function (err, res) {
//          if (err) throw err
//          console.log(res.result + ' document(s) updated')
//          db.close()
//       }
//    )
// })

// ------->>>> 9. Drop
// let MongoClient = require('mongodb').MongoClient
// let url = 'mongodb://localhost:27017/'

// MongoClient.connect(url, function (err, db) {
//    if (err) throw err
//    let dbo = db.db('mydb')
//    dbo.collection('customer').drop(function (err, delOK) {
//       if (err) throw err
//       if (delOK) console.log(`${delOK} Collection deleted`)
//       db.close()
//    })
// })

// ------->>>> Drop Collection
let MongoClient = require('mongodb').MongoClient
let url = 'mongodb://localhost:27017/'

MongoClient.connect(url, function (err, db) {
   if (err) throw err
   let dbo = db.db('mydb')
   dbo.dropCollection('customers', function (err, delOK) {
      if (err) throw err
      if (delOK) console.log(`${delOK} Collection deleted`)
      db.close()
   })
})
