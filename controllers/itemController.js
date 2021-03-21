var Item = require('../models/item');

// Display list of all items on GET.
exports.item_list = function(req, res){
    Item.find(
        req.query)
        .select(req.meta.fields)
        .limit(req.meta.limit)
        .sort(req.meta.sort)
        .exec(function(err, items){
            if(err) next(err);
            else {
                res.send(items);
            }
    });
};

// Create new item on POST.
exports.item_post = function(req, res, next){
    Item.create(req.body, function(err, item){
        if(err) next(err);
        else{
            res.setHeader("Location", `/items/${item._id}`);
            res.status(201).send(item); // 201 (Created)
        }
    });
};

// Display item with id on GET.
exports.item_id_get = function(req, res, next){
    Item.findById(req.params.id, function(err, item){
        if(err) next(err);
        else {
            res.status(200).send(item);
        }
    });
};

// Delete item with id on DELETE.
exports.item_id_put = function(req, res, next) {
    Item.updateOne({ _id: req.params.id }, req.body, function(err, item) {
        if(err) next(err);
        else {
            res.status(204).send();
        }
    });
};

// Update item with id on PUT.
exports.item_id_delete = function(req, res, next){
    const id = req.params.id;
    Item.deleteOne({ _id: id}, function (err) {
        if (err) next(err);
        else{
            res.status(204).send(); // 204 (No Content)
        }
    });
}