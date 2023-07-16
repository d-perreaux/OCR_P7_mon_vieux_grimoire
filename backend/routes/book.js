const express = require('express');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');


const router = express.Router();

const bookCtrl = require('../controllers/book.js');

router.get('/', bookCtrl.getAllBooks);
router.get('/:id', bookCtrl.getBookById);
// router.get('/bestrating', bookCtrl);

router.post('/', auth, multer, bookCtrl.addBook);

router.put('/:id', auth, multer, bookCtrl.updateBookById);

router.delete('/:id', auth, bookCtrl.deleteBookbyId);

router.post('/:id/rating', auth, bookCtrl.rateBookById);

module.exports = router;