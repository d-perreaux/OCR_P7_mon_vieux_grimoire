const express = require('express');
const router = express.Router();

const bookCtrl = require('../controllers/book.js');

router.get('/', bookCtrl.getAllBooks);
router.get('/:id', bookCtrl.getBookById);
// router.get('/bestrating', bookCtrl.);

router.post('/', bookCtrl.addBook);

router.put('/:id', bookCtrl.updateBookById);

router.delete('/:id', bookCtrl.deleteBookbyId);

module.exports = router;