const express = require('express');
const app = express();
app.use(express.json()); // Enable JSON parsing for request bodies

// In-memory array to store books
let books = [];

// Retrieve all books
app.get('/books', (req, res) => {
  res.json(books);
});

// Retrieve a specific book by ID
app.get('/books/:id', (req, res) => {
  const id = req.params.id;
  const book = books.find((b) => b.id === id);
  if (!book) {
    res.status(404).json({ error: 'Book not found' });
  } else {
    res.json(book);
  }
});

// Create a new book
app.post('/books', (req, res) => {
  const book = req.body;
  books.push(book);
  res.status(201).json(book);
});

// Update an existing book
app.put('/books/:id', (req, res) => {
  const id = req.params.id;
  const bookIndex = books.findIndex((b) => b.id === id);
  if (bookIndex === -1) {
    res.status(404).json({ error: 'Book not found' });
  } else {
    books[bookIndex] = { ...books[bookIndex], ...req.body };
    res.json(books[bookIndex]);
  }
});

// Delete a book
app.delete('/books/:id', (req, res) => {
  const id = req.params.id;
  const bookIndex = books.findIndex((b) => b.id === id);
  if (bookIndex === -1) {
    res.status(404).json({ error: 'Book not found' });
  } else {
    const deletedBook = books.splice(bookIndex, 1);
    res.json(deletedBook[0]);
  }
});

// Start the server
const port = 3000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
