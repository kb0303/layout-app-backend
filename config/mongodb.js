import { MongoClient, ServerApiVersion } from "mongodb";
import pathToCertificate from '../X509-cert-345565752601683202.pem'

const credentials = pathToCertificate;

let client;

export const connectToMongoDb = () => {
	const uri = process.env.DB_URI;
	client = new MongoClient(uri, {
		tlsCertificateKeyFile: credentials,
		serverApi: ServerApiVersion.v1
	});

	client.connect()
		.then(() => {
			console.log("Connected to MongoDB");
		})
		.catch(err => {
			console.log("Error connecting to MongoDB:", err);
		});
};

export const getDb = () => {
	return client.db("componentsData");
};
