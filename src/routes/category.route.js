const router = require('express').Router();
const { categoryController } = require('../controllers');
const authToken = require('../middlewares/authToken');

router.post('/', authToken, categoryController.createCategory);

module.exports = router;