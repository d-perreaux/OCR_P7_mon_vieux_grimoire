const sharp = require("sharp");
const crypto = require('crypto');

const MIME_TYPES = {
    'image/jpg': 'jpg',
    'image/jpeg': 'jpg',
    'image/webp': 'webp',
    'image/png': 'png'
}

const uploadSharpedImage = (req, res, next) => {
    const bookData = JSON.parse(req.body.book);
    // Check is the book datas are correct. 
    // If we don't check, a file can be upload without adding a book in the database
    if (!req.file || !bookData.title || !bookData.author || !bookData.year || !bookData.genre) {
        return next();
    }

    const randomString = crypto.randomBytes(16).toString('hex');
    const extension = MIME_TYPES[req.file.mimetype];
    req.file.filename = randomString + Date.now() + '.' + extension;

    const { buffer } = req.file;
    sharp(buffer)
        .resize(500)
        .toFile('images/' + req.file.filename, (err, info) => {
            if (err) {
                return res.status(400).json({ error: 'Erreur lors de la transformation de l\'image' });
            }
            // image sharped successfully, we want to continue to modulate the server response
            next();
        });
};


module.exports = uploadSharpedImage;