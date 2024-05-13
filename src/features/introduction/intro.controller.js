import IntroModel from "./intro.model.js";
import IntroRepository from "./intro.repository.js";

export default class IntroController {
	constructor() {
		this.introRepository = new IntroRepository()
	}

	async getAll(req, res) {
		try {
			// Fetch all data from the repository
			const data = await this.introRepository.getAll();
			res.json(data);
		} catch (error) {
			console.error('Error fetching all data:', error);
			res.status(500).send('Internal server error');
		}
	}

	async add(req, res) {
		try {
			const { name, age, place } = req.body;
			const imageUrl = req.file.filename

			// creating new content instance
			const newContent = new IntroModel(name, age, place, imageUrl)

			// adding content in the database and calculating overall time for this process(from getting the database to executing the method)
			const startTime = new Date(); // Start time
			await this.introRepository.add(newContent);
			const endTime = new Date(); // End time
			const executionTime = endTime - startTime; // Time taken in milliseconds
			res.status(201).send({ content: newContent, executionTime });
		} catch (error) {
			res.status(500).send("Something went wrong in database")
		}
	}

	async update(req, res) {
		try {
			const { name, age, place } = req.body;
			const id = req.params.id;

			let imageUrl;

			// Checking if file exists
			if (req.file) {
				imageUrl = req.file.filename;
			}

			// Calling repository update method and calculating overall time for this process
			const startTime = new Date(); // Start time
			const updatedContent = await this.introRepository.update(name, age, place, imageUrl, id);
			const endTime = new Date(); // End time
			const executionTime = endTime - startTime; // Time taken in milliseconds

			if (!updatedContent) {
				return res.status(404).send('Content not found');
			}

			res.status(200).send({ content: updatedContent, executionTime });
		} catch (error) {
			console.error(error);
			res.status(500).send('Something went wrong in database');
		}
	}


	async reset(req, res) {
		try {
			// Call the repository's reset method
			const startTime = new Date(); // Start time
			const deletedCount = await this.introRepository.reset();
			const endTime = new Date(); // End time

			const executionTime = endTime - startTime; // Time taken in milliseconds

			res.status(200).send({ message: `${deletedCount} documents deleted successfully.`, executionTime });
		} catch (error) {
			console.error('Error resetting database:', error);
			res.status(500).send('Internal server error');
		}
	}
}
