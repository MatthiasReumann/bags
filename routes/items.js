const express = require('express');
const router = express.Router();

/* Import Models */
const Item = require('../models/item');

const idvalidator = require('./middleware/idvalidator');
const itemquerybuilder = require('./middleware/itemquerybuilder')

router.use('/:itemid', idvalidator({id: "itemid"})); //TODO: Look up error handler

router.use('/', itemquerybuilder({})); //ONLY on get

/* GET /items */
router.get('/', function(req, res, next){
    Item.find(
        req.query)
        .select(req.meta.select)
        .limit(req.meta.limit)
        .sort(req.meta.sort)
        .exec(function(err, items){
            if(err) next(err);
            else res.send(items);
    });
});

/* POST /items */
router.post('/', function(req, res, next){
    if(req.body !== undefined){
        Item.create(req.body, function(err, item){
            if(err) next(err);
            else res.send(item);
        });
    }else{
        throw new Error("Empty Body");
    }
});

/* GET /items/:itemid */
router.get('/:itemid', function(req, res, next){
    Item.findById(req.params["itemid"], function(err, item){
        if(err) next(err);
        else return item;
    }).then((item) => res.send(item));
});

/* PUT /items/:itemid */
router.put('/:itemid', function(req, res, next) {
    if(req.body !== undefined){
        Item.updateOne({ _id: req.params["itemid"] }, req.body, function(err, item) {
            if(err) next(err);
            else return item;
        }).then((item) => res.send(item));
    }else{
        throw new Error("Invalid request");
    }
});

/* DELETE /items/:itemid */
router.delete('/:itemid', function(req, res, next){
    Item.deleteOne({ _id: req.params["itemid"]}, function (err) {
        if (err) next(err);
        res.send(`Item(${req.params["itemid"]}) deleted`);
    });
});



module.exports = router;