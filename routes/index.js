// index.js is my enrty point to my other routes.

const express = require('express')
const router = express.Router()


const homeController = require('../controllers/home_controller');
const { home } = require('../controllers/home_controller');

router.get('/', homeController.home);


module.exports = router;

console.log('router loaded')