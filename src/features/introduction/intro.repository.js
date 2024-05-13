import { ObjectId } from "mongodb"; 
import { getDb } from "../../../config/mongodb.js"; 

export default class IntroRepository {
	constructor() {
		// Set the collection name to "Introduction"
		this.collection = "Introduction";
	}

	// Method to fetch all documents from the collection
	async getAll() {
		try {
			const db = getDb(); // Get the MongoDB database connection
			const collection = db.collection(this.collection); // Get the collection

			// Fetch all documents from the collection and convert them to an array
			const data = await collection.find({}).toArray();
			return data;
		} catch (error) {
			console.error('Error fetching all data:', error);
			throw error;
		}
	}

	// Method to add a new document to the collection
	async add(newContent) {
		try {
			const db = getDb(); // Get the MongoDB database connection
			const collection = db.collection(this.collection); // Get the collection

			// Insert the new content into the collection
			await collection.insertOne(newContent);
			return newContent; // Return the added content
		} catch (error) {
			console.log(error);
			return "Something went wrong in products database while adding content";
		}
	}

	// Method to update a document in the collection
	async update(name, age, place, imageUrl, id) {
		try {
			const db = getDb(); // Get the MongoDB database connection
			const collection = db.collection(this.collection); // Get the collection

			// Update the document with the provided id
			const result = await collection.updateOne(
				{ _id: new ObjectId(id) }, // Filter by id
				{ $set: { name: name, age: age, place: place, imageUrl: imageUrl } } // Update fields
			);

			// If no document found to update, throw an error
			if (result.modifiedCount === 0) {
				throw new Error('No document found to update');
			}

			return "Document updated successfully"; // Return success message
		} catch (error) {
			console.error(error);
			throw new Error("Something went wrong in products database while updating content");
		}
	}

	// Method to reset the collection (delete all documents)
	async reset() {
		try {
			const db = getDb(); // Get the MongoDB database connection
			const collection = db.collection(this.collection); // Get the collection

			// Delete all documents from the collection
			const result = await collection.deleteMany({});
			return result.deletedCount; // Returns the count of deleted documents
		} catch (error) {
			console.error('Error resetting database:', error);
			throw error;
		}
	}
}
