const Book = require('../models/Book.js');
const fs = require('fs');

exports.addBook = (req, res, next) => {
    if (!req.file) {
        return res.status(400).json({ error: 'Fichier image manquant' });
    }
    const bookObject = JSON.parse(req.body.book);
    delete bookObject._id;
    delete bookObject._userId;

    const book = new Book({
        ...bookObject,
        userId: req.auth.userId, 
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    });
    book.save()
        .then(() => res.status(201).json({ message: 'book enregistré' }))
        .catch(error => res.status(400).json( {error} ));
    }

exports.getAllBooks = (req, res, next) => {
    Book.find()
        .then( books => res.status(200).json( books ))
        .catch(error => res.status(400).json( {error} ))
}

exports.getBookById = (req, res, next) => {
    Book.findOne( {_id: req.params.id})
        .then( book => res.status(200).json( book ))
        .catch( error => res.status(404).json( {error} ))
}

exports.updateBookById = (req, res, next) => {
    const bookObject = req.file ? {
        ...JSON.parse(req.body.book),
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    } : { ...req.body };

    delete bookObject._userId;

    Book.findOne( {_id: req.params.id})
        .then( (book) => {
            if (book.userId != req.auth.userId) {
                res.status(403).json( { message: ' 403: unauthorized request'})
            } else {
                if (req.file) {
                    const filename = book.imageUrl.split('/images/')[1];
                    fs.unlink(`images/${filename}`, () => {
                        Book.updateOne( { _id: req.params.id}, { ...bookObject, _id: req.params.id})
                        .then( () => res.status(200).json( {message: 'Livre modifié'}))
                        .catch( error => res.status(401).json( {error} ))});
                } else {
                Book.updateOne( { _id: req.params.id}, { ...bookObject, _id: req.params.id})
                .then( () => res.status(200).json( {message: 'Livre modifié'}))
                .catch( error => res.status(401).json( {error} ))
                }}
        })
}

exports.deleteBookbyId = (req, res, next) => {
    Book.findOne({_id: req.params.id})
        .then( book => {
            if (book.userId != req.auth.userId) {
                res.status(400).json( { message: '403: unauthorized request'});
            } else {
                const filename = book.imageUrl.split('/images/')[1];
                fs.unlink(`images/${filename}`, () => {
                    Book.deleteOne( {_id: req.params.id})
                    .then( () => res.status(200).json( {message: 'Livre supprimé'}))
                    .catch( error => res.status(404).json( {error} ))
                })
            }
        })
        .catch( error => {
            res.status(500).json( {error} );
        });
}

function isUserAlreadyRate(book, userId) {
    const hasVoted = book.ratings.some( rating => rating.userId === userId);
    return hasVoted;
}

function calculateAverageRating(book) {
    const ratings = book.ratings;
    if (ratings.length === 0) {
        book.averageRating = 0;
    } else {
        // reduce method reduce the array elements to an unique value. Here accumulator.
        const sum = ratings.reduce((accumulator, rating) => accumulator + rating.grade, 0);
        book.averageRating = parseFloat((sum / ratings.length).toFixed(1));
    }
}


exports.rateBookById = (req, res, next) => {
    Book.findOne( {_id: req.params.id})
        .then( book => {
            bookObject = book.toObject();
            const userId = req.body.userId;
            if (isUserAlreadyRate(bookObject, userId)) {
                res.status(200).json(bookObject)
            } else {
                const newRating = {
                    userId: userId,
                    grade: req.body.rating
                };
                bookObject.ratings.push(newRating);

                calculateAverageRating(bookObject);

                Book.updateOne( { _id: req.params.id}, { ...bookObject, _id: req.params.id})
                .then( () => {
                    res.status(200).json( bookObject)}
                    )
                .catch( error => res.status(401).json( {error} ))
            }
        })
        .catch( error => res.status(404).json( {error} ))
}

exports.getBestRatedBooks = (req, res, next) => {
    Book.find()
        .then( books => {
            bestRatedBooks = books.sort((a, b) => b.averageRating - a.averageRating).slice(0, 3);
            res.status(200).json(bestRatedBooks);
        })
        .catch(error => res.status(400).json( {error} ))
}