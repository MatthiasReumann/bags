const User = require('../models/user');
const BadRequest = require('../utils/badRequestError');
const notAllowedHandler = require('../middlewares/notAllowedHandler');

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

exports.user_list = notAllowedHandler;
exports.user_put = notAllowedHandler;
exports.user_delete = notAllowedHandler;


// Display user with id on GET.
exports.user_id_get = function(req, res, next){
    User.findById(req.params.id, (error, item) => {
        if(error) return next(new BadRequest(error));
        else return res.status(200).send(item); // 200 (OK)
    });
}

// Delete user with id on DELETE.
exports.user_id_put = function(req, res, next) {
    User.updateOne({ _id: req.params.id }, 
        req.body,
        (error, item) => {
            if(error) return next(new BadRequest(error));
            else return res.status(204).send(); // 204 (No Content)
        });
}

// Update user with id on PUT.
exports.user_id_delete = function(req, res, next){
    User.updateOne({ _id: req.params.id }, 
        { isDeleted: true },
        (error, item) => {
            if(error) return next(new BadRequest(error));
            else return res.status(204).send(); // 204 (No Content)
        });
}

exports.user_id_post = notAllowedHandler;


//Display list of bags of an user on GET.
exports.user_id_bags_get = function(req, res, next){
    User.find({}) // TODO: map req.query
        .select("bags")
        .exec((error, bags) => {
            if(error) return next(new BadRequest(error));
            else return res.status(200).send(bags); // 200 (OK)
        });
};

//Create new bag of an user on POST.
exports.user_id_bags_post = function(req, res, next){
    User.updateOne({_id: req.params.id}, 
        { $push: { bags: req.body } },
        (error, bag) => {
            if(error) return next(new BadRequest(error));
            else return res.status(204).send(); // 204 (No Content)
        });
}

exports.user_id_bags_put = notAllowedHandler;
exports.user_id_bags_delete = notAllowedHandler;


// Display list of an user's favorites on GET.
exports.user_id_favorites_get = function(req, res, next){
    User.findById(req.params.id)
        .select("favorites")
        .exec((error, favorites) => {
            if(error) return next(new BadRequest(error));
            else return res.status(200).send(favorites); // 200 (OK)
        });
}

// Add new favorite to user's favorite list on POST
exports.user_id_favorites_post = function(req, res, next){
    User.updateOne({_id: req.params.id}, // TODO: Check if item exists
        { $push: {favorites: req.body}},
        (error, favorite) => {
            if(error) return next(new BadRequest(error));
            else return res.status(204).send(); // 204 (No Content)
        });
}

exports.user_id_favorites_delete = notAllowedHandler;
exports.user_id_favorites_put = notAllowedHandler;