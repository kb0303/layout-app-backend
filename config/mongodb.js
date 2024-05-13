import { MongoClient } from "mongodb";

let client;
let isConnected = false;

// Function to connect to MongoDB
export const connectToMongoDb = () => {
    // If already connected, log a message and return
    if (isConnected) {
        console.log("Already connected to MongoDB");
        return;
    }

    // Connect to MongoDB using the provided URI
    MongoClient.connect(process.env.DB_URI)
        .then(clientInstance => {
            client = clientInstance;
            isConnected = true;
            console.log("Connected to MongoDB");
        })
        .catch(err => {
            console.log(err);
        });
};

// Function to get the MongoDB database connection
export const getDb = () => {
    // If not connected, throw an error
    if (!isConnected) {
        throw new Error("Not connected to MongoDB");
    }
    // Return the database from the connected client
    return client.db("componentsData");
};
