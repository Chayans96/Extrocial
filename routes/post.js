
const express = require('express');
const router = express.Router();
const passport = require('passport');

// importing post controller to get the action 
const postController = require('../controllers/post_controller');

//accessing the actions throgh routes
router.post('/create', passport.checkAuthentication, postController.create);
router.get('/destroy/:id', passport.checkAuthentication, postController.destroy);

module.exports = router;