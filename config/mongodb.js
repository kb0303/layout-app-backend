import { MongoClient, ServerApiVersion } from "mongodb";
import fs from 'fs';
import path from 'path';

const certificateFileName = 'X509-cert-345565752601683202.pem';
const pathToCertificate = path.join(__dirname, '..', certificateFileName);

let client;

export const connectToMongoDb = () => {
	const uri = process.env.DB_URI;
	const credentials = fs.readFileSync(pathToCertificate);
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
