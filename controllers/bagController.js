const Bag = require('../models/bag');
const BadRequest = require('../utils/errors/badRequestError');

module.exports.bag_post = function(req, res, next){
    Bag.create(req.body, (error, bag) => { // TODO: check if user exists, and neglect items array
        if(error) return next(new BadRequest(error)); // TODO: is it a badrequest though?
        else {
            res.setHeader("Location", `/bags/${bag._id}`);
            return res.status(201).send(bag); // 201 (Created)
        };
    });
}

module.exports.bag_id_get = function(req, res, next){
    Bag.findById(req.params.id, (error, bag) => {
        if(error) return next(new BadRequest(error));
        else return res.status(200).send(bag); // 200 (OK)
    });
}

module.exports.bag_id_delete = function(req, res, next){
    Bag.deleteOne({_id: req.params.id}, (error, bag) => {
        if(error) return next(new BadRequest(error));
        else return res.status(204).send(); // 204 (No Content)
    });
}

module.exports.bag_id_items_post = function(req, res, next){
    Bag.updateOne({_id: req.params.id}, 
        { $push : {items: req.body}},
        (error, item) => {
            if(error) return next(new BadRequest(error));
            else return res.status(204).send(); // 204 (No Content)
        });
}

module.exports.bag_id_items_id_delete = function(req, res, next){
    Bag.updateOne({_id: req.params.id}, 
        { $pull : { items: { _id:req.params.iid }}},
        (error, item) => {
            if(error) return next(new BadRequest(error));
            else return res.status(204).send(); // 204 (No Content)
        });
}

