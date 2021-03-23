const User = require('../models/user');
const BadRequest = require('../utils/badRequestError');
const notAllowedHandler = require('../middlewares/notAllowedHandler');

// Create new user on POST.
exports.user_post = function(req, res, next){
    User.create(req.body)
        .catch((error) => next(new BadRequest(error))) //is it a badrequest though?
        .then((user) => {
            res.setHeader("Location", `/users/${user._id}`);
            res.status(201).send(user); // 201 (Created)
        });
}

exports.user_list = notAllowedHandler;
exports.user_put = notAllowedHandler;
exports.user_delete = notAllowedHandler;

// Display user with id on GET.
exports.user_id_get = function(req, res, next){
    User.findById(req.params.id)
        .catch((error) => next(new BadRequest(error)))
        .then((item) => res.status(200).send(item)); // 200 (OK)
}

// Delete user with id on DELETE.
exports.user_id_put = function(req, res, next) {
    User.updateOne({ _id: req.params.id }, req.body)
        .catch((error) => next(new BadRequest(error)))
        .then((item) => res.status(204).send()); //204 (No Content)
}

// Update user with id on PUT.
exports.user_id_delete = function(req, res, next){
    User.updateOne({ _id: req.params.id}, {isDeleted: true})
        .catch((error) => next(new BadRequest(error)))
        .then((item) => res.status(204).send()); //204 (No Content)
}

exports.user_id_post = notAllowedHandler;

// Display list of an user's favorites on GET.
exports.user_id_favorites_get = function(req, res, next){
    User.findById(req.params.id)
        .select("favorites")
        .exec()
        .catch((error) => next(new BadRequest(error)))
        .then((favorites) => res.status(200).send(favorites)); //200 (OK)
}

// Add new favorite to user's favorite list on POST
exports.user_id_favorites_post = function(req, res, next){
    User.updateOne({_id: req.params.id}, { $push: {favorites: req.body}}) //TODO: Check if item exists
        .catch((error) => next(new BadRequest(error)))
        .then((favorite) => res.status(204).send()); //204 (No Content)
}

exports.user_id_favorites_delete = notAllowedHandler;
exports.user_id_favorites_put = notAllowedHandler;