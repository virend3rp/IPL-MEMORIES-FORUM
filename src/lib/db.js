import { MongoClient } from 'mongodb';

const client = new MongoClient("mongodb+srv://parasariyav:N1bvVvpSCPzthjPr@ipl-matches.5bdlm.mongodb.net/");

const clientPromise = client.connect();

export default clientPromise;
