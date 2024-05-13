import IntroModel from "./intro.model.js"; 
import IntroRepository from "./intro.repository.js"; 

export default class IntroController {
	constructor() {
		// Create a new instance of IntroRepository and assign it to introRepository
		this.introRepository = new IntroRepository();
	}

	// Method to get all data from the repository
	async getAll(req, res) {
		try {
			// Fetch all data from the repository
			const data = await this.introRepository.getAll();
			res.json(data); // Send fetched data as JSON response
		} catch (error) {
			console.error('Error fetching all data:', error);
			res.status(500).send('Internal server error'); // Send error response if an error occurs
		}
	}

	// Method to add new content
	async add(req, res) {
		try {
			const { name, age, place } = req.body;
			const imageUrl = req.file.filename; // Get filename of uploaded image

			// Create a new instance of IntroModel with provided data
			const newContent = new IntroModel(name, age, place, imageUrl);

			// Add content to the database and measure execution time
			const startTime = new Date(); // Start time
			await this.introRepository.add(newContent); // Add content to the database
			const endTime = new Date(); // End time
			const executionTime = endTime - startTime; // Calculate execution time in milliseconds

			// Send response with added content and execution time
			res.status(201).send({ content: newContent, executionTime });
		} catch (error) {
			res.status(500).send("Something went wrong in database"); // Send error response if an error occurs
		}
	}

	// Method to update existing content
	async update(req, res) {
		try {
			const { name, age, place } = req.body; // Extract name, age, and place from request body
			const id = req.params.id; // Get id from request parameters

			let imageUrl;

			// Check if file exists in request
			if (req.file) {
				imageUrl = req.file.filename; // Get filename of uploaded image
			}

			// Update content in the database and measure execution time
			const startTime = new Date(); // Start time
			const updatedContent = await this.introRepository.update(name, age, place, imageUrl, id); // Update content in the database
			const endTime = new Date(); // End time
			const executionTime = endTime - startTime; // Calculate execution time in milliseconds

			// If content is not found, return 404 status
			if (!updatedContent) {
				return res.status(404).send('Content not found');
			}

			// Send response with updated content and execution time
			res.status(200).send({ content: updatedContent, executionTime });
		} catch (error) {
			console.error(error);
			res.status(500).send('Something went wrong in database'); // Send error response if an error occurs
		}
	}

	// Method to reset the database
	async reset(req, res) {
		try {
			const startTime = new Date(); // Start time
			const deletedCount = await this.introRepository.reset(); // Reset the database
			const endTime = new Date(); // End time

			const executionTime = endTime - startTime; // Calculate execution time in milliseconds

			// Send response with message and execution time
			res.status(200).send({ message: `${deletedCount} documents deleted successfully.`, executionTime });
		} catch (error) {
			console.error('Error resetting database:', error);
			res.status(500).send('Internal server error'); // Send error response if an error occurs
		}
	}
}
