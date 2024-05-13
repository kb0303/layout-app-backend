import IntroRepository from "./intro.repository.js";
import IntroModel from "./intro.model.js";

export default class IntroController {
    constructor() {
        this.introRepository = new IntroRepository()
    }

    async getAll(req, res) {
        try {
            const startTime = new Date(); // Start time
            const data = await this.introRepository.getAll();
            const endTime = new Date(); // End time
            const executionTime = endTime - startTime; // Time taken in milliseconds
            res.json({ data, executionTime });
        } catch (error) {
            console.error('Error fetching all data:', error);
            res.status(500).send('Internal server error');
        }
    }

    async add(req, res) {
        try {
            const { name, age, place } = req.body;
            const imageUrl = req.file.filename;

            const startTime = new Date(); // Start time
			const newContent = new IntroModel(name, age, place, imageUrl)
            const result = await this.introRepository.add(newContent);
            const endTime = new Date(); // End time
            const executionTime = endTime - startTime; // Time taken in milliseconds

            res.status(201).json({ result, executionTime });
        } catch (error) {
            console.error('Error adding content:', error);
            res.status(500).send("Something went wrong in database");
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

            const startTime = new Date(); // Start time
            const updatedContent = await this.introRepository.update(name, age, place, imageUrl, id);
            const endTime = new Date(); // End time
            const executionTime = endTime - startTime; // Time taken in milliseconds

            if (!updatedContent) {
                return res.status(404).send('Content not found');
            }

            res.json({ updatedContent, executionTime });
        } catch (error) {
            console.error('Error updating content:', error);
            res.status(500).send('Something went wrong in database');
        }
    }

    async reset(req, res) {
        try {
            const startTime = new Date(); // Start time
            const deletedCount = await this.introRepository.reset();
            const endTime = new Date(); // End time
            const executionTime = endTime - startTime; // Time taken in milliseconds

            res.status(200).json({ executionTime, deletedCount });
        } catch (error) {
            console.error('Error resetting database:', error);
            res.status(500).send('Internal server error');
        }
    }
}
