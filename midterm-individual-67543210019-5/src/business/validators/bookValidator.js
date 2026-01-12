// src/business/validators/bookValidator.js
class BookValidator {

    // Validate create book
    validateBookData(data) {
        const { title, author, isbn } = data;

        if (!title || !author || !isbn) {
            throw new Error('Title, author, and ISBN are required');
        }

        return true;
    }

    // Validate update book (partial allowed)
    validateUpdateBookData(data) {
        const allowedFields = ['title', 'author', 'isbn', 'status'];

        const keys = Object.keys(data);
        if (keys.length === 0) {
            throw new Error('No data provided for update');
        }

        for (const key of keys) {
            if (!allowedFields.includes(key)) {
                throw new Error(`Invalid field: ${key}`);
            }
        }

        if (data.isbn) {
            this.validateISBN(data.isbn);
        }

        if (data.status) {
            this.validateStatus(data.status);
        }

        return true;
    }

    // Validate ISBN
    validateISBN(isbn) {
        // Pattern: (978|979) + 9 digits + (digit or X)
        const isbnPattern = /^(97[89])?\d{9}[\dXx]$/;
        const cleanISBN = isbn.replace(/-/g, '');

        if (!isbnPattern.test(cleanISBN)) {
            throw new Error('Invalid ISBN format');
        }

        return true;
    }

    // Validate ID
    validateId(id) {
        const numId = parseInt(id);
        if (isNaN(numId) || numId <= 0) {
            throw new Error('Invalid book ID');
        }
        return numId;
    }

    // Validate status
    validateStatus(status) {
        const allowedStatus = ['available', 'borrowed'];

        if (!allowedStatus.includes(status)) {
            throw new Error(`Invalid status. Allowed: ${allowedStatus.join(', ')}`);
        }

        return true;
    }
}

module.exports = new BookValidator();
