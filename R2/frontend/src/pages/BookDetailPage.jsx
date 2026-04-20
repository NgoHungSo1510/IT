import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000';

function BookDetailPage() {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [reviewerName, setReviewerName] = useState('');
  const [rating, setRating] = useState(5);
  const [content, setContent] = useState('');

  const fetchBookDetails = async () => {
    const res = await axios.get(`${API_URL}/books/${id}`);
    setBook(res.data);
  };

  useEffect(() => {
    fetchBookDetails();
  }, [id]);

  const handleAddReview = async (e) => {
    e.preventDefault();
    await axios.post(`${API_URL}/books/${id}/reviews`, {
      reviewer_name: reviewerName || 'Anonymous',
      rating,
      content
    });
    setReviewerName(''); setRating(5); setContent('');
    fetchBookDetails(); 
  };

  if (!book) return <p>Loading or not found...</p>;

  return (
    <div>
      <Link to="/">Back to Home</Link>
      
      <h2>{book.title}</h2>
      <p><strong>Author:</strong> {book.author}</p>
      {book.cover_url && <img src={book.cover_url} alt="Cover" width="150" />}
      <p>{book.description}</p>
      
      <hr />
      
      <h3>Add a Review</h3>
      <form onSubmit={handleAddReview}>
        <div><label>Name:</label> <input value={reviewerName} onChange={(e)=>setReviewerName(e.target.value)} /></div>
        <div>
          <label>Rating:</label> 
          <select value={rating} onChange={(e)=>setRating(Number(e.target.value))}>
            <option value="5">5</option><option value="4">4</option>
            <option value="3">3</option><option value="2">2</option><option value="1">1</option>
          </select>
        </div>
        <div><label>Review:</label> <textarea value={content} onChange={(e)=>setContent(e.target.value)} required /></div>
        <button type="submit">Submit Review</button>
      </form>

      <hr />

      <h3>Reviews ({book.reviews?.length || 0})</h3>
      {book.reviews?.map(r => (
        <div key={r.id} className="review-card">
          <p><strong>{r.reviewer_name}</strong> - Rating: {r.rating}/5</p>
          <p>{r.content}</p>
        </div>
      ))}
    </div>
  );
}

export default BookDetailPage;
