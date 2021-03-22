const express = require('express');
const notAllowedHandler = require('../middlewares/notAllowedHandler');

const itemController = require('../controllers/itemController');

const idValidator = require('../middlewares/idValidator');
const bodyValidator = require('../middlewares/bodyValidator');

const itemQueryBuilder = require('../middlewares/itemQueryBuilder');
const itemUpdateBuilder = require('../middlewares/itemUpdateBuilder');

const router = express.Router();

router.delete('/', notAllowedHandler);
router.put('/', notAllowedHandler);
router.post('/:id', notAllowedHandler);

/*
    /items 
*/

// GET request to list items
router.get('/', itemQueryBuilder, itemController.item_list);

// POST request to create item
router.post('/', bodyValidator, itemController.item_post);


/*
    /items/:id
*/

// Validate if 'id' is really an ID
router.use('/:id', idValidator({id: "id"}));

// GET request to display item with 'itemid'
router.get('/:id', itemController.item_id_get);

// PUT request to update item with 'itemid'
router.put('/:id', 
    bodyValidator, 
    itemUpdateBuilder, 
    itemController.item_id_put);

// DELETE request to delete item with 'itemid'
router.delete('/:id', itemController.item_id_delete);

module.exports = router;