import IntroModel from "./intro.model.js";
import IntroRepository from "./intro.repository.js";

export default class IntroController {
	constructor() {
		this.introRepository = new IntroRepository()
	}

	async getAll(req, res) {
		try {
			const startTime = new Date(); // Start time
			// Fetch all data from the repository
			const data = await this.introRepository.getAll();
			const endTime = new Date(); // End time
			const executionTime = endTime - startTime; // Time taken in milliseconds
			console.log('Total time taken to process getAll request:', executionTime, 'milliseconds');

			res.json(data);
		} catch (error) {
			console.error('Error fetching all data:', error);
			res.status(500).send('Internal server error');
		}
	}

	async add(req, res) {
		try {
			const startTime = new Date(); // Start time
			const { name, age, place } = req.body;
			const imageUrl = req.file.filename

			// creating new content instance
			const newContent = new IntroModel(name, age, place, imageUrl)

			// adding content in the database
			await this.introRepository.add(newContent);
			const endTime = new Date(); // End time
			const executionTime = endTime - startTime; // Time taken in milliseconds
			console.log('Total time taken to process add request:', executionTime, 'milliseconds');

			res.status(201).send(newContent);

		} catch (error) {
			res.status(500).send("Something went wrong in database")
		}
	}

	async update(req, res) {
		try {
			const startTime = new Date(); // Start time
			const { name, age, place } = req.body;
			const id = req.params.id;

			let imageUrl;

			// Checking if file exists
			if (req.file) {
				imageUrl = req.file.filename;
			}

			// Calling repository update method
			const updatedContent = await this.introRepository.update(name, age, place, imageUrl, id);
			const endTime = new Date(); // End time
			const executionTime = endTime - startTime; // Time taken in milliseconds
			console.log('Total time taken to process update request:', executionTime, 'milliseconds');

			if (!updatedContent) {
				return res.status(404).send('Content not found');
			}

			res.json(updatedContent);
		} catch (error) {
			console.error(error);
			res.status(500).send('Something went wrong in database');
		}
	}

	async reset(req, res) {
		try {
			const startTime = new Date(); // Start time
			// Call the repository's reset method
			const deletedCount = await this.introRepository.reset();
			const endTime = new Date(); // End time
			const executionTime = endTime - startTime; // Time taken in milliseconds
			console.log('Total time taken to process reset request:', executionTime, 'milliseconds');

			res.status(200).send(`${deletedCount} documents deleted successfully.`);
		} catch (error) {
			console.error('Error resetting database:', error);
			res.status(500).send('Internal server error');
		}
	}
}
