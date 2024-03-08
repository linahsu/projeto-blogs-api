const router = require('express').Router();
const { postController } = require('../controllers');
const authToken = require('../middlewares/authToken');

router.post('/', authToken, postController.createBlogPost);

router.get('/', authToken, postController.getAllBlogPosts);
router.get('/search', authToken, postController.getBlogPostByQuery);
router.get('/:id', authToken, postController.getBlogPostById);

router.put('/:id', authToken, postController.updateBlogPost);

router.delete('/:id', authToken, postController.deleteBlogPost);

module.exports = router;