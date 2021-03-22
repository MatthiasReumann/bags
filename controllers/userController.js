const User = require('../models/user');

// Create new user on POST.
exports.user_post = function(req, res, next){
    User.create(req.body)
        .catch((error) => next(new BadRequest(error))) //is it a badrequest though?
        .then((user) => {
            res.setHeader("Location", `/users/${user._id}`);
            res.status(201).send(user); // 201 (Created)
        });
}

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