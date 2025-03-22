import { ObjectId } from 'mongodb';  // Import ObjectId from MongoDB driver
import clientPromise from '../../../lib/db';

export async function GET(req) {
  const { searchParams } = new URL(req.url);  // Parse the query string of the URL
  const matchId = searchParams.get('matchId');  // Get the value of the 'matchId' query parameter

  // If no matchId is provided, return a 400 error
  if (!matchId) {
    return new Response(
      JSON.stringify({ error: 'matchId parameter is missing' }),
      { status: 400 }
    );
  }

  // Try converting the matchId into an ObjectId
  let objectId;
  try {
    objectId = new ObjectId(matchId);  // Convert the string to ObjectId
  } catch (error) {
    return new Response(
      JSON.stringify({ error: 'Invalid matchId format' }),
      { status: 400 }
    );
  }


  try {
    // Wait for the client to connect to the database
    const client = await clientPromise;
    const db = client.db('IPL-MATCHES');
    const matchesCollection = db.collection('ALL-MATCHES');

    // Query the database to find a match for the given matchId
    const match = await matchesCollection.findOne({ _id: objectId });

    if (!match) {
      return new Response(
        JSON.stringify({ error: `No match found with matchId ${matchId}` }),
        { status: 404 }
      );
    }
    return new Response(JSON.stringify(match), { status: 200 });
  } catch (error) {
    console.error('Error fetching match:', error);
    return new Response(
      JSON.stringify({ error: 'Failed to fetch match details' }),
      { status: 500 }
    );
  }
}
