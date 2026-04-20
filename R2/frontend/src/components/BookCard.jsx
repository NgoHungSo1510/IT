function BookCard({ book }) {
  return (
    <div style={{ border: '1px solid #ddd', padding: '15px', margin: '10px 0', borderRadius: '8px' }}>
      <h3>{book.title}</h3>
      <p><strong>Tác giả:</strong> {book.author}</p>
      <p>{book.description}</p>
    </div>
  );
}
export default BookCard;