const express = require('express');
const router = express.Router();

/* Import Models */
const Bag = require('../models/bag');

/* GET all bags. */
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
      else return newBag;
    }).then((bag) => res.send(bag));
  }
});

/* GET bag with bag-id */
router.get('/:id', function(req, res, next) {
  const id = req.params.id;

  if(id !== undefined){
    Bag.findById(id, '_id name owner items createdAt', function(err, bags){
      if(err) res.send(err);
      res.send(bags);
    });
  }
});

/* UPDATE bag with bag-id */
router.put('/:id', function(req, res, next) {
  const id = req.params.id;

  if(id !== undefined && req.body !== undefined){
    Bag.updateOne({ _id: id }, req.body, function(err, bag) {
        if(err) res.send(err);
        res.send(bag);
    });
  }
});

/* DELETE bag with bag-id */
router.delete('/:id', function(req, res, next) {
  const id = req.params.id;

  if(id !== undefined){
    Bag.deleteOne({ _id:  id}, function (err) {
        if (err) res.send(err);
        res.send(`Bag(${id}) deleted`);
    });
  }
});

/*CREATE new item with bag-id */
router.post('/:id/items', function(req, res, next){
  const id = req.params.id;
  const body = req.body;

  if(id !== undefined && req.body !== undefined){
    Bag.findById(id).then(bag => {
      bag.items.push(body);
      bag.save();
      res.send(bag);
    });
  }
});

/*GET items with bag-id */
router.get('/:id/items', function(req, res, next){
  const id = req.params.id;

  if(id !== undefined){
    Bag.findById(id, 'items', function(err, items){
      if(err) res.send(err);
      res.send(items);
    });
  }
});

/*DELETE all items in bag with id */
router.delete('/:id/items', function(req, res, next){
  const id = req.params.id;

  if(id !== undefined){
    Bag.findById(id).then(bag => {
      bag.items = [];
      bag.save();

      return bag;
    }).then((bag) => {
      res.send(bag);
    })
  }
});

/* GET item with id*/
router.get('/:id/items/:itemid', function(req, res, next){
  const id = req.params.id;
  const itemid = req.params.itemid;

  if(id !== undefined && itemid !== undefined){
    Bag.findById(id).then(bag => {
      res.send(bag.items.id(itemid));
    });
  }
})

/* UPDATE item with id */
router.put('/:id/items/:itemid', function(req, res, next){
  const id = req.params.id;
  const itemid = req.params.itemid;

  if(id !== undefined && itemid !== undefined && req.body !== undefined){
    Bag.findById(id).then(bag => {
      const item = bag.items.id(itemid);
      item.set(req.body);
      return bag.save();

    }).then((bag) => {
      res.send(bag);
    });
  }
})

module.exports = router;
