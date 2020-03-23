const Photo = require('../../models/Photo');

module.exports = (req, res, next) => {
  res.locals.settings = { title: 'List' };
  
  Photo.find({}, (err, photos) => {
    if (err) return next(err);
    res.render('list/index', { title: 'Welcome to Photos', photos });
  });
};