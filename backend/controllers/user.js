
const User = require('../models/User.js');
const bcrypt = require('bcrypt');

exports.signUp = (req, res, next) => {
  bcrypt.hash(req.body.password, 10)
    .then(hash => {
      const user = new User({
        email: req.body.email,
        password: hash
      });
      user.save()
        .then(() => res.status(201).json({ message: 'user sécurisé créé' }))
        .catch(error => res.status(400).json({ message: 'pas possible créer' }));
    })
    .catch(error => res.status(500).json({ error }))
}


exports.login = (req, res, next) => {

};
