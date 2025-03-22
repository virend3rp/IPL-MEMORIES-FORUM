"use client";
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';  // Import useRouter for dynamic routing
import axios from 'axios';
import Card from '../../../Components/Card';  // Import the Card component
import Link from 'next/link';  // Import Link for navigation

export default function YearWiseMatchesPage({ params }) {
  // Use React.use to unwrap the params and access the 'year'
  const year = React.use(params)?.year; // This will unwrap the 'year' from params

  // Ensure `year` is a valid string or number before rendering
  if (typeof year !== 'string' && typeof year !== 'number') {
    console.error('Invalid year parameter:', year);
    return <div>Error: Invalid year</div>;
  }

  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        console.log(`Fetching matches for the year ${year}...`);
        // Make the API call to fetch matches for the selected year
        const response = await axios.get(`/api?year=${year}`); // Pass the year as query param
        setMatches(response.data);
      } catch (error) {
        console.error('Error fetching matches:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    if (year) {
      fetchMatches();
    }
  }, [year]);  // Fetch matches whenever 'year' changes

  if (loading) {
    return <div>Loading matches for {year}...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-yellow-300 p-4 overflow-auto">
      <div className="text-center mb-8 w-full">
        <h1 className="text-4xl font-bold text-gray-800">IPL Matches for {year}</h1>
        <p className="text-lg text-gray-600">Here are all the matches for {year}.</p>
      </div>

      {/* Flexbox to display cards in a row */}
      <div className="flex flex-wrap justify-center gap-4">
        {matches.length > 0 ? (
          matches.map((match, index) => (
            <div key={match._id} className="flex flex-col items-center card-container">
              {/* Add match number and display the card */}
              <div className="text-center text-lg font-semibold mb-2 text-red-900">Match {index + 1}</div>

              {/* Link component to make the card clickable */}
                    <Link href={`/year-wise-matches/${year}/${match._id}`}>
                            <div className="cursor-pointer hover:scale-105 hover:shadow-lg transition-all ease-in-out duration-300">
                                <Card key={match._id} match={match} />
                            </div>
                    </Link>

            </div>
          ))
        ) : (
          <p>No matches found for this year.</p>
        )}
      </div>
    </div>
  );
}
