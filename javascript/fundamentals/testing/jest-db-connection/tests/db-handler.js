const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');

// const mongod = new MongoMemoryServer();


/**
 * Connect to the in-memory database.
 */
module.exports.connect = async () => {
    console.log('==========connection==========');
    const mongod = await MongoMemoryServer.create();
    const uri = await mongod.getUri();

    const mongooseOpts = {
        useNewUrlParser: true
    };

    await mongoose.connect(uri, mongooseOpts);
}

/**
 * Drop database, close the connection and stop mongod.
 */
module.exports.closeDatabase = async () => {
    console.log('==========close==========');
    const mongod = await MongoMemoryServer.create();
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
    await mongod.stop();
}

/**
 * Remove all the data for all db collections.
 */
module.exports.clearDatabase = async () => {
    console.log('==========clear==========');
    const collections = mongoose.connection.collections;

    for (const key in collections) {
        const collection = collections[key];
        await collection.deleteMany();
    }
}