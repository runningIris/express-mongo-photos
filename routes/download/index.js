const path = require('path');
const Photo = require('../../models/Photo');

module.exports = dir => (req, res, next) => {
  const { id } = req.params;
  Photo.findById(id, (err, photo) => {
    if (err) return next(err);
    try {
      console.log();
    } catch(e) {
      console.error(e);
    }
    res.download(path.join(dir, photo.path), photo.name + photo.path.match(/.(jpg|jpeg|png|svg|webp)$/i)[0]);
  });
};