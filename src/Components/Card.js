// components/Card.js
import React from 'react';

const Card = ({ match }) => {
  return (
    <div className="card">
      <h3>{match['Team 1']} vs {match['Team 2']}</h3>
      <p><strong>Match Winner:</strong> {match['Match_Winner']}</p>
      <p><strong>Winning Type:</strong> {match['Win_Type']}</p>
      <p><strong>Win Margin:</strong> {match['Win_Margin']} {match['Win_Type']}</p>
      <style jsx>{`
        .card {
          border: 1px solid #ddd;
          border-radius: 10px;
          padding: 20px;
          margin: 10px;
          background-color: #f9f9f9;
          box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
        }
        h3 {
          color: #333;
        }
        p {
          color: #555;
        }
      `}</style>
    </div>
  );
};

export default Card;
