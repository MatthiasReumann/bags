const express = require('express');

const MethodNotAllowed = require('../middlewares/notAllowedHandler');

const bagController = require('../controllers/bagController');

const paramsIdValidator = require('../middlewares/paramsIdValidator');
const bodyValidator = require('../middlewares/bodyValidator');

const router = express.Router();

/*
    /bags
*/
router.get('/', MethodNotAllowed);

// POST request to add new bag
router.post('/', bodyValidator, bagController.bag_post);
router.put('/',MethodNotAllowed);
router.delete('/',MethodNotAllowed);

/*
    /bags/:id
*/
router.use('/:id', paramsIdValidator({id:"id"}));

// GET request to display bag with id
router.get('/:id', bagController.bag_id_get);
router.post('/:id', MethodNotAllowed);
router.put('/:id', MethodNotAllowed);

// DELETE request to delete bag with id
router.delete('/:id',bagController.bag_id_delete);

/*
    /bags/:id/items
*/

router.get('/:id/items', MethodNotAllowed);

//POST request to add new item to bag
router.post('/:id/items', 
    bodyValidator, 
    bagController.bag_id_items_post);
router.put('/:id/items', MethodNotAllowed);
router.delete('/:id/items', MethodNotAllowed);

/*
    /bags/:id/items/:iid
*/

router.get('/:id/items/:iid', MethodNotAllowed);
router.post('/:id/items/:iid', MethodNotAllowed);
router.put('/:id/items/:iid', MethodNotAllowed);

// DELETE request to delete item with id from bag
router.delete('/:id/items/:iid', 
    paramsIdValidator({id:"iid"}), 
    bagController.bag_id_items_id_delete);

module.exports = router;