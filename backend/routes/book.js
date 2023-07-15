const express = require('express');
const auth = require('../middleware/auth');

const router = express.Router();

const bookCtrl = require('../controllers/book.js');

router.get('/', bookCtrl.getAllBooks);
router.get('/:id', bookCtrl.getBookById);
// router.get('/bestrating', bookCtrl.);

router.post('/', auth, bookCtrl.addBook);

router.put('/:id', auth, bookCtrl.updateBookById);

router.delete('/:id', auth, bookCtrl.deleteBookbyId);

module.exports = router;