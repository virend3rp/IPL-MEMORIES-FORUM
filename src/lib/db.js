import { MongoClient } from 'mongodb';

// Make sure to replace '<Your-Connection-String>' with your actual MongoDB connection string
const uri = process.env.MONGO_URI; // Assuming you have your MongoDB URI stored in an environment variable named MONGO_URI
const client = new MongoClient(uri);

const clientPromise = client.connect();

export default clientPromise;
