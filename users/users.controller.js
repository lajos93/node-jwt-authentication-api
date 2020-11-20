const express = require('express');
const router = express.Router();
const userService = require('./user.service');

// User schema
const User = require('../models/Users.js');

// routes
router.post('/register', register);
router.post('/authenticate', authenticate);
router.get('/', getAll);

module.exports = router;

function authenticate(req, res, next) {
    userService.authenticate(req.body)
        .then(user => res.json(user))
        .catch(next);
}

function register(req, res, next) {
    userService.register(req.body)
    .then(reggedUser => res.json(reggedUser))
    .catch(next);
}

function getAll(req, res, next) {
    userService.getAll()
        .then(users => res.json(users))
        .catch(next);
}
