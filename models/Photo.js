const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');

const schema = new mongoose.Schema({
  name: String,
  path: String
});

module.exports = mongoose.model('Photo', schema);