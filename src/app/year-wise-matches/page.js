// src/app/year-wise-matches/page.js

import Link from 'next/link';

export default function YearWiseMatches() {
  const years = Array.from({ length: 2024 - 2008 + 1 }, (_, index) => 2008 + index);

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-yellow-300 p-4 overflow-auto">
      <div className="text-center mb-8 w-full">
        <h1 className="text-4xl font-bold text-gray-800">IPL Matches by Year</h1>
        <p className="text-lg text-gray-600">Select a year to view the matches.</p>
      </div>
      <div className="space-y-4 animate-scroll">
        {years.map(year => (
          <Link 
            key={year} 
            href={`/year-wise-matches/${year}`}  // Dynamic route to fetch matches for the selected year
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-4 px-6 rounded-lg shadow-lg transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-110 text-xl block text-center"
          >
            {year}
          </Link>
        ))}
      </div>
    </div>
  );
}
