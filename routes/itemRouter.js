const express = require('express');
const router = express.Router();

const itemController = require('../controllers/itemController');

const idValidator = require('../middlewares/idValidator');
const bodyValidator = require('../middlewares/bodyValidator');
const itemQueryBuilder = require('../middlewares/itemQueryBuilder');
const itemUpdateBuilder = require('../middlewares/itemUpdateBuilder');

router.use('/items/:id', idValidator({id: "id"})); //TODO: Look up error handler

// ITEM ROUTES //

// GET request to list items
router.get('/items', itemQueryBuilder, itemController.item_list);

// POST request to create item
router.post('/items', bodyValidator, itemController.item_post);

// GET request to display item with 'itemid'
router.get('/items/:id', itemController.item_id_get);

// PUT request to update item with 'itemid'
router.put('/items/:id', 
    bodyValidator, 
    itemUpdateBuilder, 
    itemController.item_id_put);

// DELETE request to delete item with 'itemid'
router.delete('/items/:id', itemController.item_id_delete);

module.exports = router;