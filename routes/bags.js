const express = require('express');
const router = express.Router();

/* Models */
const Bag = require('../models/bag');

/* READ bags. */
router.get('/', function(req, res, next) {
  Bag.find({}, '_id name owner items createdAt', function(err, bags){
    if(err) res.send(err);
    res.send(bags);
  });
});

/* CREATE empty bag */
router.post('/', function(req, res, next){
  if(req.body !== undefined){
    Bag.create(req.body, function(err, newBag){
      if(err) res.send(err);
      res.send(newBag);
    });
  }
});

/* READ bag with id */
router.get('/:id', function(req, res, next) {
  const id = req.params.id;

  if(id !== undefined){
    Bag.find({_id: id}, '_id name owner items createdAt', function(err, bags){
      if(err) res.send(err);
      res.send(bags);
    });
  }
});

/* UPDATE bag with id */
router.put('/:id', function(req, res, next) {
  const id = req.params.id;

  if(id !== undefined && req.body !== undefined){
    Bag.updateOne({ _id: id }, req.body, function(err, bag) {
        if(err) res.send(err);
        res.send(bag);
    });
  }
});

/* DELETE bag with id */
router.delete('/:id', function(req, res, next) {
  const id = req.params.id;

  if(id !== undefined){
    Bag.deleteOne({ _id:  id}, function (err) {
        if (err) res.send(err);
        res.send(`Bag(${id}) deleted`);
    });
  }
});

/*CREATE new item in bag with id */
router.post('/:id/items', function(req, res, next){
  const id = req.params.id;
  const body = req.body;

  if(id !== undefined && req.body !== undefined){
    Bag.findOne({_id: id}).then(bag => {
      bag.items.push(body.name);
      bag.save();
      res.send(bag);
    })
  }
});

/*READ items in bag with id */
router.get('/:id/items', function(req, res, next){
  const id = req.params.id;

  if(id !== undefined){
    Bag.find({_id: id}, 'items', function(err, items){
      if(err) res.send(err);
      res.send(items);
    })
  }
});

/*UPDATE items in bag with id => NOT ALLOWED*/

/*DELETE all items in bag with id */
router.delete('/:id/items', function(req, res, next){
  const id = req.params.id;

  if(id !== undefined){
    Bag.findOne({_id: id}).then(bag => {
      bag.items = [];
      bag.save();
      res.send(bag);
    })
  }
});

module.exports = router;
