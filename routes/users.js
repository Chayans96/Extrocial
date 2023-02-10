//routes for users

const express = require('express');
const router = express.Router();
const passport = require('passport');

//getting to users controller 
const usersController = require('../controllers/users_controller');

//adding post
// const usersPost = require('../controllers/post');

//as we now have users controller we need to route it 
router.get('/profile', passport.checkAuthentication ,usersController.profile);
// router.get('/profile' ,usersController.profile);
// router.get('/post', usersPost.post);
router.get('/sign-up',usersController.signUp);
router.get('/sign-in',usersController.signIn);

router.post('/create', usersController.create);

//use passport as a middleware to authenticate
router.post('/create-session', passport.authenticate(
    'local',
    {failureRedirect :'/users/sign-in' },)
,usersController.createSession);


//creating route for loggingout
router.get('/sign-out', usersController.destroySession);

module.exports = router;
