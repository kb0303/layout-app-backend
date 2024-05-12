import { MongoClient } from "mongodb";

let client;
let isConnected = false;

export const connectToMongoDb = () => {
    if (isConnected) {
        console.log("Already connected to mongoDb");
        return;
    }

    MongoClient.connect(process.env.DB_URI)
        .then(clientInstance => {
            client = clientInstance;
            isConnected = true;
            console.log("Connected to mongoDb");
        })
        .catch(err => {
            console.log(err);
        })
}

export const getDb = () => {
    if (!isConnected) {
        throw new Error("Not connected to MongoDB");
    }
    return client.db("componentsData");
}
