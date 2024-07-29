const express = require('express');
const books = require("./booksdb.js"); // This file should export your book database
const public_users = express.Router();

// Function to simulate async operation for a specific book by title
const getBooksByTitle = (title) => {
  return new Promise((resolve, reject) => {
    try {
      setTimeout(() => {
        const booksByTitle = Object.values(books).filter(book => book.title === title);
        if (booksByTitle.length > 0) {
          resolve(booksByTitle);
        } else {
          reject(new Error("No books found with this title"));
        }
      }, 100);
    } catch (error) {
      reject(error);
    }
  });
};

// Get the book list available in the shop using async/await
public_users.get('/', async (req, res) => {
  try {
    const allBooks = await getBooks(); // Use async function
    res.json(allBooks); // Send books as response
  } catch (error) {
    res.status(500).json({ message: "Failed to get books", error: error.message });
  }
});

// Get book details based on ISBN using async/await
public_users.get('/isbn/:isbn', async (req, res) => {
  const { isbn } = req.params;
  try {
    const book = await getBookByISBN(isbn); // Implement this function
    res.json(book); // Send book details as response
  } catch (error) {
    res.status(404).json({ message: "Book not found", error: error.message });
  }
});

// Get book details based on Author using async/await
public_users.get('/author/:author', async (req, res) => {
  const { author } = req.params;
  try {
    const booksByAuthor = await getBooksByAuthor(author); // Implement this function
    res.json(booksByAuthor); // Send books by author as response
  } catch (error) {
    res.status(404).json({ message: "No books found by this author", error: error.message });
  }
});

// Get book details based on Title using async/await
public_users.get('/title/:title', async (req, res) => {
  const { title } = req.params;
  try {
    const booksByTitle = await getBooksByTitle(title); // Use async function
    res.json(booksByTitle); // Send books by title as response
  } catch (error) {
    res.status(404).json({ message: "No books found with this title", error: error.message });
  }
});

module.exports.general = public_users;
