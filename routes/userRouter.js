const express = require('express');

const paramsIdValidator = require('../middlewares/paramsIdValidator');
const bodyIdValidator = require('../middlewares/bodyIdValidator');
const bodyValidator = require('../middlewares/bodyValidator');

const userController = require('../controllers/userController');

const userUpdateBuilder = require('../middlewares/userUpdateBuilder');

const router = express.Router();

/*
    /users
*/
router.get('/', userController.user_list); // NOT ALLOWED

// POST request to create user
router.post('/', bodyValidator, userController.user_post);

router.put('/', userController.user_put); // NOT ALLOWED
router.delete('/', userController.user_delete); // NOT ALLOWED


/*
    /users/:id
*/

// Validate if 'id' is really an ID
router.use('/:id', paramsIdValidator({id: "id"}));

// GET request to display user
router.get('/:id', userController.user_id_get);

router.post('/:id', userController.user_id_post); //NOT ALLOWED

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

router.get('/:id/bags', userController.user_id_bags_get);
router.post('/:id/bags', 
    bodyValidator,
    userController.user_id_bags_post);
router.put('/:id/bags', userController.user_id_bags_put); // NOT ALLOWED
router.delete('/:id/bags', userController.user_id_bags_delete); // NOT ALLOWED

/*
    /users/:id/favorites
*/

// GET request to display favorites of user
router.get('/:id/favorites', userController.user_id_favorites_get);

// POST request to add new favorite
router.post('/:id/favorites', 
    bodyValidator, 
    bodyIdValidator({id:"_id"}), // check if _id in body is really an ID, TODO: even necessary? does mongoose do that automatically?
    userController.user_id_favorites_post);

router.delete(':/id/favorites', userController.user_id_favorites_delete); // NOT ALLOWED
router.put('/:id/favorites', userController.user_id_favorites_put); // NOT ALLOWED

module.exports = router;