const config = require('config.json');
const jwt = require('jsonwebtoken');

// User schema
const User = require('../models/Users.js');

// users hardcoded for simplicity, store in a db for production applications
const users = [{ id: 1, username: 'test', password: 'test', firstName: 'Test', lastName: 'User' }];

module.exports = {
    register,
    authenticate,
    getAll
};

async function register(req,res) {
    const { email, password } = req.body;
    const user = new User({ email, password });

    try {
        // if you are using await, don't pass it a callback
        const saveUser = await user.save();
        return res.send({
            email: saveUser.email
        });
    } catch (error) {
        // use try/catch to handle error instead of error first parameter in callback
        return res.status(400).send(error);
    }
}

async function authenticate({ username, password }) {
    const user = users.find(u => u.username === username && u.password === password);

    if (!user) throw 'Username or password is incorrect';

    // create a jwt token that is valid for 7 days
    const token = jwt.sign({ sub: user.id }, config.secret, { expiresIn: '7d' });

    return {
        ...omitPassword(user),
        token
    };
}

async function getAll() {
    return users.map(u => omitPassword(u));
}

// helper functions

function omitPassword(user) {
    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
}