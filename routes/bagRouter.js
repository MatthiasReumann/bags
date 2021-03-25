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
router.post('/', bodyValidator, bagController.bag_post);
router.put('/',MethodNotAllowed);
router.delete('/',MethodNotAllowed);

/*
    /bags/:id
*/
router.use('/:id', paramsIdValidator({id:"id"}));

router.get('/:id', bagController.bag_id_get);
router.post('/:id', MethodNotAllowed);
router.put('/:id', MethodNotAllowed);
router.delete('/:id',bagController.bag_id_delete);

/*
    /bags/:id/items
*/

router.get('/:id/items', MethodNotAllowed);
router.post('/:id/items', bagController.bag_id_items_post);
router.put('/:id/items', MethodNotAllowed);
router.delete('/:id/items', MethodNotAllowed);

/*
    /bags/:id/items/:iid
*/
router.get('/:id/items/:iid', MethodNotAllowed);
router.post('/:id/items/:iid', MethodNotAllowed);
router.put('/:id/items/:iid', MethodNotAllowed);
router.delete('/:id/items/:iid', paramsIdValidator({id:"iid"}), bagController.bag_id_items_id_delete);

module.exports = router;