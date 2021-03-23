const Item = require('../models/item');
const BadRequest = require('../utils/errors/badRequestError');

// Display list of all items on GET.
exports.item_list = function(req, res, next){
    Item.find(
        req.query)
        .where('isDeleted').equals(false)
        .select(req.meta.fields)
        .limit(req.meta.limit)
        .sort(req.meta.sort)
        .exec((error, items) => {
            if(error) return next(new BadRequest(error));
            else return res.status(200).send(items); // 200 (OK)
        });
}

// Create new item on POST.
exports.item_post = function(req, res, next){
    Item.create(req.body, (error, item) => {
        if(error) return next(new BadRequest(error));
        else {
            res.setHeader("Location", `/items/${item._id}`);
            return res.status(201).send(item); // 201 (Created)
        }
    });
}

// Display item with id on GET.
exports.item_id_get = function(req, res, next){
    Item.findById(req.params.id, (error, item) => {
        if(error) return next(new BadRequest(error));
        else return res.status(200).send(item); // 200 (OK)
    });
}

// Delete item with id on DELETE.
exports.item_id_put = function(req, res, next) {
    Item.updateOne({ _id: req.params.id }, req.body, (error, item) => {
        if(error) return next(new BadRequest(error));
        else return res.status(204).send(); // 204 (No Content)
    });
}

// Update item with id on PUT.
exports.item_id_delete = function(req, res, next){
    Item.updateOne({ _id: req.params.id}, {isDeleted: true}, (error, item) => {
        if(error) return next(new BadRequest(error));
        else return res.status(204).send(); // 204 (No Content)
    });
}