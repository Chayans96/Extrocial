// index.js is my enrty point to my other routes.

const express = require('express');
const router = express.Router();


const homeController = require('../controllers/home_controller');
// const { home } = require('../controllers/home_controller');
// const postController = require('../controllers/post_controller');

console.log('router loaded');


router.get('/', homeController.home);
router.use('/users', require('./users'));
router.use('/posts', require('./post'))
router.use('/comments',require('./comments'))

// router.post('/post', homeController.post);
// router.use('/login', require('./login'));

router.use('/api', require('./api'));


module.exports = router;
