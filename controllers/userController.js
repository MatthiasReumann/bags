const User = require('../models/user');
const Bag = require('../models/bag');
const BadRequest = require('../utils/errors/badRequestError');

// Create new user on POST.
exports.user_post = function(req, res, next){
    User.create(req.body, (error, user) => {
        if(error) return next(new BadRequest(error)); // TODO: is it a badrequest though?
        else {
            res.setHeader("Location", `/users/${user._id}`);
            res.status(201).send(user); // 201 (Created)
        }
    });
}

// Display user with id on GET.
exports.user_id_get = function(req, res, next){
    User.findById(req.params.id, (error, item) => {
        if(error) return next(new BadRequest(error));
        else return res.status(200).send(item); // 200 (OK)
    });
}

// Update user with id on PUT.
exports.user_id_put = function(req, res, next) {
    User.updateOne({ _id: req.params.id }, 
        req.body,
        (error, item) => {
            if(error) return next(new BadRequest(error));
            else return res.status(204).send(); // 204 (No Content)
        });
}

// Delete user with id on DELETE.
exports.user_id_delete = function(req, res, next){
    User.updateOne({ _id: req.params.id }, 
        { isDeleted: true },
        (error, item) => {
            if(error) return next(new BadRequest(error));
            else return res.status(204).send(); // 204 (No Content)
        });
}

// Display list of bags of an user on GET.
exports.user_id_bags_get = function(req, res, next){
    Bag.find({owner: req.params.id}).exec((error, bags) => {
        if(error) return next(new BadRequest(error));
        else return res.status(200).send(bags); // 200 (OK)
    });
}

// Display list of an user's favorites on GET.
exports.user_id_favorites_get = function(req, res, next){
    User.findById(req.params.id)
        .select("-_id favorites")
        .exec((error, favorites) => {
            if(error) return next(new BadRequest(error));
            else return res.status(200).send(favorites); // 200 (OK)
        });
}

// Add new favorite to user's favorite list on POST
exports.user_id_favorites_post = function(req, res, next){
    User.updateOne({_id: req.params.id},
        { $push: {favorites: req.body}},
        (error, favorite) => {
            if(error) return next(new BadRequest(error));
            else return res.status(204).send(); // 204 (No Content)
        });
}