// controllers/api.js

exports.getApiInfo = (req, res) => {
    res.status(200).json({
      message: "Welcome to the Bookshelves API",
      endpoints: {
        "GET /resource": "Information about the resources",
        "GET /bookshelves": "Get all bookshelves",
        "GET /bookshelves/:id": "Get a bookshelf by ID",
        "POST /bookshelves": "Create a new bookshelf",
        "PUT /bookshelves/:id": "Update an existing bookshelf",
        "DELETE /bookshelves/:id": "Delete a bookshelf"
      }
    });
  };
  