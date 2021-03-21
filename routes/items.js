const express = require('express');
const router = express.Router();

const itemController = require('../controllers/itemController');

const idValidator = require('../middlewares/idvalidator');
const itemQueryBuilder = require('../middlewares/itemquerybuilder');

router.use('items/:itemid', idValidator({id: "itemid"})); //TODO: Look up error handler

// ITEM ROUTES //

// GET request to list items
router.get('/items', itemQueryBuilder({limit:50}), itemController.item_list);

// POST request to create item
router.post('/items', itemController.item_post);

// GET request to display item with 'itemid'
router.get('/items/:id', itemController.item_id_get);

// PUT request to update item with 'itemid'
router.put('/items/:id', itemController.item_id_put);

// DELETE request to delete item with 'itemid'
router.delete('/items/:id', itemController.item_id_delete);

module.exports = router;