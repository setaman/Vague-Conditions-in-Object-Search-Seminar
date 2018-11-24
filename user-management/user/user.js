const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

let db;

// Connection URL
const url = 'mongodb://localhost:27017/user';

// Database Name
const dbName = 'usersDb';

// Create a new MongoClient
const client = new MongoClient(url);

async function connectToMongo() {
    return await client.connect(function(err) {
        console.log("Connected successfully to server");

        db = client.db(dbName);

        client.close();
    });
}

// Use connect method to connect to the Server

module.exports = {
    db,
    connectToMongo
};