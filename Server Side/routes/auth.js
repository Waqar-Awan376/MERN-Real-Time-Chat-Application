const express = require('express');
const { check } = require('express-validator/check');
const authController = require('../controllers/authController');
const route = express.Router();

route.post('/register', [
    check('email', "Please enter a valid email").isEmail(),
    check('username', "Please enter a valid username").notEmpty(),
    check('password', "Please enter an alphanumeric password with length>5").isLength({ min: 5 }).isAlphanumeric().trim()
], authController.postRegister);

route.post('/login', [
    check('email', "Please enter a valid email").isEmail(),
    check('password', "Please enter an alphanumeric password with length>5").isLength({ min: 5 }).isAlphanumeric().trim()
], authController.postLogin);


module.exports = route;