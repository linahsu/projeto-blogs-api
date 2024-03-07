const router = require('express').Router();
const { postController } = require('../controllers');
const authToken = require('../middlewares/authToken');

router.post('/', authToken, postController.createBlogPost);
router.get('/', authToken, postController.getAllBlogPosts);
router.get('/:id', authToken, postController.getBlogPostById);

module.exports = router;