const express = require('express');
const { check } = require('express-validator/check');
const messageController = require('../controllers/messageController');
const route = express.Router();

route.post('/send', messageController.postMessage);
route.get('/getAll', messageController.getMessages);


module.exports = route;