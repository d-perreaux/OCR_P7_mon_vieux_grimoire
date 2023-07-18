const multer = require('multer');

//Stock in memoryStorage cause we want to sharp it before loading it in the server folder
const storage = multer.memoryStorage();

module.exports = multer({ storage }).single('image');

