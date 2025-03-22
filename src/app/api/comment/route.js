import { ObjectId } from 'mongodb';
import clientPromise from '../../../lib/db';

// Handle GET requests to fetch comments by matchId
export async function GET(req) {
    const { searchParams } = new URL(req.url);
    const matchId = searchParams.get('matchId');

    if (!matchId) {
        return new Response(JSON.stringify({ error: 'matchId parameter is missing' }), { status: 400 });
    }

    let objectId;
    try {
        objectId = new ObjectId(matchId);
    } catch (error) {
        return new Response(JSON.stringify({ error: 'Invalid matchId format' }), { status: 400 });
    }


    try {
        const client = await clientPromise;
        const db = client.db('IPL-MATCHES');
        const commentsCollection = db.collection('ALL-COMMENTS');

        const comments = await commentsCollection.find({ matchId: objectId }).toArray();

        // If no comments found, return an empty array instead of a 404 error
        return new Response(JSON.stringify(comments), {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
        });
    } catch (error) {
        console.error('Error fetching comments:', error);
        return new Response(JSON.stringify({ error: 'Failed to fetch comments' }), { status: 500 });
    }
}

// Handle POST requests to create a new comment
export async function POST(req) {
    let data;
    console.log(data);
    try {
        data = await req.json();
    } catch (error) {
        return new Response(JSON.stringify({ error: 'Invalid JSON' }), { status: 400 });
    }
    console.log(data);
    const { text, user, matchId,commentedAt} = data;

    if (!text || !matchId) {
        return new Response(JSON.stringify({ error: 'Missing required fields' }), { status: 400 });
    }

    let objectId;
    try {
        objectId = new ObjectId(matchId);
        console.log("I am making a objectidd:",objectId);
    } catch (error) {
        return new Response(JSON.stringify({ error: 'Invalid matchId format' }), { status: 400 });
    }

    try {
        const client = await clientPromise;
        const db = client.db('IPL-MATCHES');
        const commentsCollection = db.collection('ALL-COMMENTS');

        const newComment = { text, user: user || 'Anonymous', matchId: objectId, commentedAt: commentedAt};
        const result = await commentsCollection.insertOne(newComment);
        console.log("I have inserted",result);
        if (!result.insertedId) {
            console.error('Error saving comment: No document was inserted.');
            return new Response(JSON.stringify({ error: 'Failed to save comment' }), { status: 500 });
        }

        // If you need to return the newly created comment, you would typically find it again or construct it from the provided data:
        const savedComment = {
            _id: result.insertedId,
            text,
            user: user || 'Anonymous',
            matchId: objectId,
            commentedAt: new Date()
        };

        return new Response(JSON.stringify(savedComment), { status: 201, headers: { 'Content-Type': 'application/json' } });
    } catch (error) {
        console.error('Error saving comment:', error);
        return new Response(JSON.stringify({ error: 'Failed to save comment' }), { status: 500 });
    }
}
