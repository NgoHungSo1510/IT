import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000';

function HomePage() {
  const [books, setBooks] = useState([]);
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [description, setDescription] = useState('');
  const [coverUrl, setCoverUrl] = useState('');

  const fetchBooks = async () => {
    try {
      const res = await axios.get(`${API_URL}/books`);
      setBooks(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const handleAddBook = async (e) => {
    e.preventDefault();
    await axios.post(`${API_URL}/books`, {
      title,
      author,
      description,
      cover_url: coverUrl
    });
    setTitle(''); setAuthor(''); setDescription(''); setCoverUrl('');
    fetchBooks();
  };

  return (
    <div>
      <h2>Add New Book</h2>
      <form onSubmit={handleAddBook}>
        <div><label>Title:</label> <input value={title} onChange={(e)=>setTitle(e.target.value)} required /></div>
        <div><label>Author:</label> <input value={author} onChange={(e)=>setAuthor(e.target.value)} required /></div>
        <div><label>Cover URL:</label> <input value={coverUrl} onChange={(e)=>setCoverUrl(e.target.value)} /></div>
        <div><label>Description:</label> <textarea value={description} onChange={(e)=>setDescription(e.target.value)} /></div>
        <button type="submit">Add Book</button>
      </form>

      <hr />

      <h2>Book List</h2>
      {books.length === 0 && <p>No books available.</p>}
      {books.map(book => (
        <div key={book.id} className="book-card">
          <h3>
            <Link to={`/book/${book.id}`}>{book.title}</Link>
          </h3>
          <p>Author: {book.author}</p>
        </div>
      ))}
    </div>
  );
}

export default HomePage;