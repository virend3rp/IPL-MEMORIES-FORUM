import clientPromise from '../../lib/db';

export async function GET(req) {
  // Get the 'year' query parameter from the URL
  const { searchParams } = new URL(req.url);
  const year = searchParams.get('year'); // Retrieve the year from the query parameters

  // If no year is provided, return a 400 error
  if (!year) {
    return new Response(
      JSON.stringify({ error: 'Year parameter is missing' }),
      { status: 400 }
    );
  }

  // Validate the year to ensure it's a valid number
  const parsedYear = parseInt(year, 10);
  if (isNaN(parsedYear)) {
    return new Response(
      JSON.stringify({ error: 'Invalid year parameter' }),
      { status: 400 }
    );
  }

  console.log(`API route triggered for year: ${parsedYear}`);

  try {
    // Wait for the client to connect to the database
    const client = await clientPromise;
    const db = client.db('IPL-MATCHES');
    const matchesCollection = db.collection('ALL-MATCHES');

    // Query the database to find matches for the given year
    const matches = await matchesCollection.find({ Year: parsedYear }).toArray();

    if (matches.length === 0) {
      return new Response(
        JSON.stringify({ error: `No matches found for year ${parsedYear}` }),
        { status: 404 }
      );
    }

    return new Response(JSON.stringify(matches), { status: 200 });
  } catch (error) {
    console.error('Error fetching matches:', error);
    return new Response(
      JSON.stringify({ error: 'Failed to fetch matches' }),
      { status: 500 }
    );
  }
}
