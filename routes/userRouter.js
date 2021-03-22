const express = require('express');
const notAllowedHandler = require('../middlewares/notAllowedHandler');

const idValidator = require('../middlewares/idValidator');
const bodyValidator = require('../middlewares/bodyValidator');

const userController = require('../controllers/userController');

const userUpdateBuilder = require('../middlewares/userUpdateBuilder');

const router = express.Router();

router.get('/', notAllowedHandler);
router.put('/', notAllowedHandler);
router.delete('/', notAllowedHandler);
router.post('/:id', notAllowedHandler);

/*
    /users
*/
router.post('/', bodyValidator, userController.user_post);


/*
    /users/:id
*/

// Validate if 'id' is really an ID
router.use('/:id', idValidator({id: "id"}));

router.get('/:id', userController.user_id_get);
router.put('/:id', bodyValidator, userUpdateBuilder, userController.user_id_put);
router.delete('/:id', userController.user_id_delete);

module.exports = router;