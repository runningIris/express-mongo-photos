const Photo = require('../../models/Photo');
const path = require('path');
const fs = require('fs');

exports.form = (req, res) => {
  res.render('photos/upload', {
    title: 'Photo Upload'
  });
};

exports.submit = dir => (req, res, next) => {
  const img = req.file;
  const name = req.body.photo.name || img.originalname;
  const dest = path.join(dir, img.originalname);
  const origin = img.path;
  
  fs.rename(origin, dest, err => {
    if (err) return next(err);

    Photo.create({
      name,
      path: img.originalname
    }, err => {
      if (err) return next(err);
      res.redirect('/');
    });
  });
};
