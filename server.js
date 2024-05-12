import express from 'express';
import cors from 'cors';
import './env.js';
import path from 'path';
import { fileURLToPath } from 'url';
import { connectToMongoDb } from './config/mongodb.js';
import IntroRouter from './src/features/introduction/intro.routes.js';

const server = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

server.use(cors());
server.use(express.json());
server.use('/uploads', express.static(path.join(__dirname, 'uploads')));
server.use('/api/data1', IntroRouter);

server.get('/', (req, res) => {
    res.send('Welcome to Draggy');
});

const startServer = async () => {
    try {
        await connectToMongoDb(); // Wait for MongoDB connection to establish
        const port = process.env.PORT || 8080;
        server.listen(port, () => {
            console.log(`Server is listening on port: ${port}`);
        });
    } catch (error) {
        console.error('Failed to start the server:', error);
    }
};

startServer();

export default server;
