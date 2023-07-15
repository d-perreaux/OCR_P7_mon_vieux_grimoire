const Book = require('../models/Book.js');

exports.addBook = (req, res, next) => {
    delete req.body._id;
    const book = new Book({
    ...req.body
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
    Book.updateOne( {_id: req.params.id}, { ...req.body, _id: req.params.id})
        .then( () => res.status(200).json( {message: 'Livre modifié'}))
        .catch( error => res.status(404).json( {error} ))
}

exports.deleteBookbyId = (req, res, next) => {
    Book.deleteOne( {_id: req.params.id})
        .then( () => res.status(200).json( {message: 'Livre supprimé'}))
        .catch( error => res.status(404).json( {error} ))
}


