const http = require('http');
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const multer  = require('multer');

const routes = require('./routes');
const app = express();

app.configure(() => {
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'ejs');
  app.set('title', 'Images Management');
  app.set('photos', __dirname + '/public/photos');
  app.use(express.logger('dev'));
  app.use(multer({ dest: 'uploads/' }).single('photo[image]'));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('production', () => {
  app.set('photos', __dirname + '/mounted-volume/photos');
});

app.get('/', routes.list);
app.get('/photo/:id/download', routes.download(app.get('photos')));

app.get('/upload', routes.form);
app.post('/upload', routes.submit(app.get('photos')));

const server = http.createServer(app);

server.listen(app.get('port'), () => {
  console.log(`Express server listening on port ${app.get('port')}`);
});