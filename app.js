const { MongoClient } = require("mongodb");
// Replace the uri string with your MongoDB deployment's connection string.
const uri = "mongodb://localhost:27017";

const client = new MongoClient(uri, { useUnifiedTopology: true });
const database = client.db('fruitsDB');

async function run() {
    try {
        await client.connect();
        console.log("Connected Successfully to server");

        const fruitsCollection = database.collection('fruits');
        // appel de la fonction findAll en async
        await findAll(fruitsCollection);
        // await insertMany(fruitsCollection, { name: "Coconut", score: 8, review: "Great fruit" },{ name: "Mango", score: 10, review: "Great fruit" })
    } finally {
        // Ensures that the client will close when you finish/error
        await client.close();
    }
}
async function findAll(collection){
    const cursor = collection.find({});

        if ((await cursor.count()) === 0) {
            console.log("No documents found!");
        }
        // log each fruits in db
        await cursor.forEach((fruit) => {
            console.log(fruit);
        });
}
async function insertMany(collection, ...docs){
    // const docs = [ syntax
    //     { name: "Apple", score: 8, review: "Great fruit" },
    //     { name: "Orange", score: 6, review: "Kinda sour" },
    //     { name: "Banana", score: 9, review: "Great stuff!" }
    // ];
    // Insert many docs into fruitsCollection
    const result = await collection.insertMany(docs);
    console.log(`${result.insertedCount} documents were inserted`);
}

run().catch(console.dir);