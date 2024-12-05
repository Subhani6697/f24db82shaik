const mongoose = require('mongoose');

const BookshelveSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Bookshelve name is required'],
        minlength: [3, 'Bookshelve name must be at least 3 characters long'],  
        maxlength: [100, 'Bookshelve name cannot exceed 100 characters'], 
    },
    material: {
        type: Number,
        required: [true, 'Material is required'],
        min: [1, 'Material must be at least 1'],  
        max: [1000, 'Material seems too large, check for valid input'], 
    },
    shelves: {
        type: String,
        required: [true, 'Shelve is required'],
    },
});

module.exports = mongoose.model('Bookshelve', BookshelveSchema);