//Mongoose
const mongoose = require('mongoose');
const mongo_uri = 'mongodb://localhost/draw-from-hat';

mongoose.connect(mongo_uri, function(err) {
    if (err) {
      throw err;
    } else {
      console.log(`Successfully connected to ${mongo_uri}`);
    }
  });