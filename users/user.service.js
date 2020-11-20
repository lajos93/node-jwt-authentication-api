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

async function register(data) {
    const { username, email, firstName, lastName, password } = data;
    const user = new User({ username, email, firstName, lastName, password });
    return user.save();
}

async function authenticate({ username, password }) {
   // const user = User.findOne(u => u.username === username && u.password === password);

    let userData = await User.findOne({ username }, function(err, user) {
        if (err) {
          console.error(err);
          throw 'Internal error please try again';
        } else if (!user) {
          throw 'Incorrect email or password';
        } else {
          user.isCorrectPassword(password, function(err, same) {
            if (err) {
              throw 'Incorrect email or password';
            } else if (!same) {
              throw 'Incorrect email or password';
            } else {            
            }
          });
        }
      });

      return userData._doc,getToken(userData._doc);
}

function getToken(userData){
  const token = jwt.sign({ sub: userData._id }, config.secret, { expiresIn: '7d' });
  return {
    ...omitPassword(userData)
    ,token
  };
}

async function getAll() {
    //return users.map(u => omitPassword(u));
    return  User.find({}, function(err, users) {
      var userMap = {};
  
      users.forEach(function(user) {
        userMap[user._id] = user;
      });
  
      return userMap;  
    });
}

// helper functions

function omitPassword(user) {
    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
}