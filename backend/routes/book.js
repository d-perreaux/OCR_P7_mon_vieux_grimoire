const express = require('express');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');
const sharp = require('../middleware/sharp-config')


const router = express.Router();

const bookCtrl = require('../controllers/book.js');

router.get('/', bookCtrl.getAllBooks);
router.get('/bestrating', bookCtrl.getBestRatedBooks);
router.get('/:id', bookCtrl.getBookById);


router.post('/', auth, multer, sharp, bookCtrl.addBook);

router.put('/:id', auth, multer, sharp, bookCtrl.updateBookById);

router.delete('/:id', auth, bookCtrl.deleteBookbyId);

router.post('/:id/rating', auth, bookCtrl.rateBookById);

module.exports = router;