const express = require('express');

const MethodNotAllowed = require('../middlewares/notAllowedHandler');

const itemController = require('../controllers/itemController');

const paramsIdValidator = require('../middlewares/paramsIdValidator');
const bodyValidator = require('../middlewares/bodyValidator');

const itemQueryBuilder = require('../middlewares/itemQueryBuilder');
const itemUpdateBuilder = require('../middlewares/itemUpdateBuilder');

const router = express.Router();

/*
    /items 
*/

// GET request to list items
router.get('/', itemQueryBuilder, itemController.item_list);

// POST request to create item
router.post('/', bodyValidator, itemController.item_post);

router.put('/', MethodNotAllowed);
router.delete('/', MethodNotAllowed);


/*
    /items/:id
*/

// Validate if 'id' is really an ID
router.use('/:id', paramsIdValidator({id: "id"}));

// GET request to display item with 'itemid'
router.get('/:id', itemController.item_id_get);

router.post('/:id', MethodNotAllowed);

// PUT request to update item with 'itemid'
router.put('/:id', 
    bodyValidator, 
    itemUpdateBuilder, 
    itemController.item_id_put);

// DELETE request to delete item with 'itemid'
router.delete('/:id', itemController.item_id_delete);

module.exports = router;