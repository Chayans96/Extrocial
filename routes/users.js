//routes for users

const express = require('express');
const router = express.Router();

//getting to users controller 
const usersController = require('../controllers/users_controller');

//adding post
const usersPost = require('../controllers/post');
//as we now have users controller we need to route it 
router.get('/profile', usersController.profile)

route.get('/post', userPost.post);

module.exports = router;