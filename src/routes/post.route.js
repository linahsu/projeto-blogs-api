const router = require('express').Router();
const { postController } = require('../controllers');
const authToken = require('../middlewares/authToken');

router.post('/', authToken, postController.createBlogPost);

module.exports = router;