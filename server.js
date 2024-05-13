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

// Middleware
server.use(cors()); // Enable CORS
server.use(express.json()); // Parse incoming JSON
server.use('/uploads', express.static(path.join(__dirname, 'uploads'))); // Serve static files in 'uploads' directory
server.use('/api/data1', IntroRouter); // Mount IntroRouter to handle routes for '/api/data1'

// Route to handle root endpoint
server.get('/', (req, res) => {
    res.send('Welcome to Draggy');
});

// Function to start the server
const startServer = () => {
    try {
        connectToMongoDb(); // Connect to MongoDB
        const port = process.env.PORT || 8080;
        server.listen(port, () => {
            console.log(`Server is listening on port: ${port}`); 
        });
    } catch (error) {
        console.error('Failed to start the server:', error); // Log error if server fails to start
    }
};

startServer(); // Call startServer to start the server

export default server;