const path = require('path');
const express = require('express');
const app = express();

app.use('/dist', express.static(path.join(__dirname, '/dist')));

app.get('/', (req, res) => {
  console.log(req.url);
  res.sendFile('index.html', {
    root: 'public'
  });
});

app.set('port', process.env.PORT || 3000);
app.set('host', process.env.PORT || 'localhost');

module.exports = app
