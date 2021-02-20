const express = require('express');
const router = express.Router();

const homeController = require('../controllers/homeController');
const usersController = require('../controllers/usersController');
const getUserCityController = require('../controllers/getUserCityController');
const addUserCityController = require('../controllers/addUserCityController');
const addCityController = require('../controllers/addCityController');

router.get('/', homeController.home);
router.get('/users', usersController.user);
router.get('/getUserCity', getUserCityController.get);
router.get('/addUserCity', addUserCityController.add);
router.get('/addCity', addCityController.add);

module.exports = router;