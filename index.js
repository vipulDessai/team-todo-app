const express = require('express');
const path = require('path');
const { config } = require('dotenv');
config();

const app = express();

app.use(
  express.urlencoded({
    extended: true,
  }),
);

app.use(express.json());

const mongoClient = require('./server/mongo-db');
mongoClient.initRequestHandler(app);

// Serve only the static files form the bulid directory
app.use(express.static(path.join(__dirname, 'build')));

app.use('/assets', express.static(path.join(__dirname, 'assets')));

app.get('*', function (req, res) {
  res.sendFile(path.resolve(path.join(__dirname, 'build', 'index.html')));
});

// Start the app by listening on the default Heroku port
app.listen(process.env.PORT || 8080);
