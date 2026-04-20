import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import HomePage from './pages/HomePage';
import BookDetailPage from './pages/BookDetailPage';
import './index.css';

function App() {
  return (
    <Router>
      <div>
        <header>
          <h1><Link to="/">Book Review App</Link></h1>
          <hr />
        </header>

        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/book/:id" element={<BookDetailPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;