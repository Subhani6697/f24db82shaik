const mongoose = require('mongoose');

const BookshelveSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Bookshelve name is required'],
        minlength: [3, 'Bookshelve name must be at least 3 characters long'],  // Minimum length for name
        maxlength: [100, 'Bookshelve name cannot exceed 100 characters'],  // Maximum length for name
    },
    capacity: {
        type: Number,
        required: [true, 'Capacity is required'],
        min: [1, 'Capacity must be at least 1'],  // Capacity should be at least 1
        max: [1000, 'Capacity seems too large, check for valid input'],  // Upper limit for capacity
    },
    location: {
        type: String,
        required: [true, 'Location is required'],
    },
});

module.exports = mongoose.model('Bookshelve', BookshelveSchema);
