import express from "express";
import IntroController from "./intro.controller.js";
import { upload } from "../../middleware/fileUpload.middleware.js";

const IntroRouter = express.Router();

// Create an instance of IntroController
const introController = new IntroController();

// Define paths to controller methods

// Route to add new content
IntroRouter.post('/add', upload.single('imageUrl'), (req, res) => {
	introController.add(req, res);
});

// Route to get all content
IntroRouter.get('/', (req, res) => {
	introController.getAll(req, res)
});

// Route to update content by id
IntroRouter.put('/:id', upload.single('imageUrl'), (req, res) => {
	introController.update(req, res)
});

// Route to reset the database
IntroRouter.delete('/reset', (req, res) => {
	introController.reset(req, res);
});

export default IntroRouter;
