import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { MongoClient, ServerApiVersion } from 'mongodb';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const certificateFileName = 'X509-cert-345565752601683202.pem';
const pathToCertificate = join(__dirname, '..', certificateFileName);

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
