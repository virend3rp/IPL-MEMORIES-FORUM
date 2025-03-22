"use client";
import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function MatchPage({ params }) {
  const matchId = React.use(params)?.matchId;

  const [match, setMatch] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [comment, setComment] = useState(''); // State to hold the new comment input
  const [comments, setComments] = useState([]); // State to hold the list of comments
  
  // Handles changes in the textarea input
  const handleCommentChange = (e) => {
      setComment(e.target.value);
  };
  
  // Handles submitting the new comment
  const handleCommentSubmit = async () => {
      if (!comment.trim()) return; // Prevent empty comments
  
      const newComment = {
          user: "Anonymous", // Adjust based on your authentication logic
          text: comment,
          matchId: matchId, // Assuming you're passing matchId from props or context
          commentedAt: new Date()
      };
  
      try {
          const response = await axios.post('/api/comment', newComment);
          setComments([...comments, response.data]); // Add the new comment to the list
          setComment(''); // Clear the input field
      } catch (error) {
          console.error("Error posting comment:", error);
          // Optionally handle error state here
      }
  };
  
  useEffect(() => {
    if (!matchId) return;  // Don't fetch data unless matchId is available

    const fetchMatchAndComments = async () => {
      try {
        // Fetch match details
        const matchResponse = await axios.get(`/api/matches?matchId=${matchId}`);
        setMatch(matchResponse.data);
        
        // Fetch comments
        const commentsResponse = await axios.get(`/api/comment?matchId=${matchId}`);
        setComments(commentsResponse.data);
      } catch (err) {
        setError('Failed to fetch data.');
        console.error('Fetch error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchMatchAndComments();
  }, [matchId]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="match-page-container">
      {match ? (
        <div className="match-card">
          <h1 className="match-title">{match['Team 1']} vs {match['Team 2']}</h1>
          <p className="match-info">Venue: {match.Venue}</p>
          <p className="match-info">Scores: {match.First_Innings_Score} - {match.Second_Innings_Score}</p>
          <p className="match-info">Date: {new Date(match.Date).toLocaleDateString()}</p>
          <p className="match-info">Winner: {match.Match_Winner} won by {match.Win_Margin} {match.Win_Type}</p>
          <p className="match-info">Player of the Match: {match.Player_of_Match}</p>
        </div>
      ) : <div>Loading match details...</div>}
        <div className="comments-section">
            <h2 className='comments-title'>Comments</h2>

            {/* List of Comments */}
            <div className="comments-list">
                {comments.length ? comments.map((comment, index) => (
                    <div key={index} className="comment">
                        <p>{comment.user}: {comment.text}</p>
                        <small>{new Date(comment.commentedAt).toLocaleString()}</small>
                    </div>
                )) : <p className='comment p'>No comments yet. Be the first to share your memory!</p>}
            </div>

            {/* Comment Input Area */}
            <div className="comment-input-container">
                <textarea
                    className="comment-input"
                    placeholder="Share your memory..."
                    value={comment}
                    onChange={handleCommentChange}
                ></textarea>
                <button onClick={handleCommentSubmit} className="submit-button">
                    Submit Comment
                </button>
            </div>
        </div>
    </div>
  );
}
