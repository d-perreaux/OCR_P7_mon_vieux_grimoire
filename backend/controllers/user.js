
const User = require('../models/User.js');

exports.createUser = (req, res, next) => {
    console.log(req.body);
    const user = new User({
      ...req.body
    });
    user.save()
    .then( () => res.status(201).json( { message: 'objet créé'}))
    .catch( error => res.status(400).json( {message: 'pas possible créer'}) )
}