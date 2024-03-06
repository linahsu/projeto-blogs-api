const router = require('express').Router();
const { userController } = require('../controllers');
const authToken = require('../middlewares/authToken');

router.post('/', userController.createUser);
router.get('/', authToken, userController.getAllUsers);
router.get('/:id', authToken, userController.getUserById);

module.exports = router;