const express = require('express');

const MethodNotAllowed = require('../middlewares/notAllowedHandler');

const paramsIdValidator = require('../middlewares/paramsIdValidator');
const bodyValidator = require('../middlewares/bodyValidator');

const userController = require('../controllers/userController');

const userUpdateBuilder = require('../middlewares/userUpdateBuilder');

const router = express.Router();

/*
    /users
*/
router.get('/', MethodNotAllowed);

// POST request to create user
router.post('/', bodyValidator, userController.user_post);

router.put('/', MethodNotAllowed);
router.delete('/', MethodNotAllowed);


/*
    /users/:id
*/

// Validate if 'id' is really an ID
router.use('/:id', paramsIdValidator({id: "id"}));

// GET request to display user
router.get('/:id', userController.user_id_get);

router.post('/:id', MethodNotAllowed);

// PUT request to update user
router.put('/:id', 
    bodyValidator, 
    userUpdateBuilder, 
    userController.user_id_put);

// DELETE request to delete user
router.delete('/:id', userController.user_id_delete);


/*
    /users/:id/bags
*/

// GET request to display bags of user
router.get('/:id/bags', userController.user_id_bags_get);

// POST request to add new bag
router.post('/:id/bags', 
    bodyValidator,
    userController.user_id_bags_post);

router.put('/:id/bags', MethodNotAllowed);
router.delete('/:id/bags', MethodNotAllowed);

/*
    /users/:id/favorites
*/

// GET request to display favorites of user
router.get('/:id/favorites', userController.user_id_favorites_get);

// POST request to add new favorite
router.post('/:id/favorites', 
    bodyValidator,
    userController.user_id_favorites_post);

router.delete(':/id/favorites', MethodNotAllowed);
router.put('/:id/favorites', MethodNotAllowed);

module.exports = router;