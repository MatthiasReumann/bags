const Item = require('../models/item');
const BadRequest = require('../utils/badRequest');

// Display list of all items on GET.
exports.item_list = function(req, res, next){
    Item.find(
        req.query)
        .where('isDeleted').equals(false)
        .select(req.meta.fields)
        .limit(req.meta.limit)
        .sort(req.meta.sort)
        .exec()
        .catch((error) => next(new BadRequest(error)))
        .then((items) => res.send(items));
}

// Create new item on POST.
exports.item_post = function(req, res, next){
    Item.create(req.body)
        .catch((error) => next(new BadRequest(error))) //is it a badrequest though?
        .then((item) => {
            res.setHeader("Location", `/items/${item._id}`);
            res.status(201).send(item); // 201 (Created)
        });
}

// Display item with id on GET.
exports.item_id_get = function(req, res, next){
    Item.findById(req.params.id)
        .catch((error) => next(new BadRequest(error)))
        .then((item) => res.status(200).send(item)); // 200 (OK)
}

// Delete item with id on DELETE.
exports.item_id_put = function(req, res, next) {
    Item.updateOne({ _id: req.params.id }, req.body)
        .catch((error) => next(new BadRequest(error)))
        .then((item) => res.status(204).send()); //204 (No Content)
}

// Update item with id on PUT.
exports.item_id_delete = function(req, res, next){
    Item.updateOne({ _id: req.params.id}, {isDeleted: true})
        .catch((error) => next(new BadRequest(error)))
        .then((item) => res.status(204).send()); //204 (No Content)
}