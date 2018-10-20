const http = require('http');
const app = require('./app');
const socket = require('./sockets');
const server = http.Server(app);

socket(server);

const port = app.get('port');
const host = app.get('host');

server.listen(port, () => {
  console.log(`server listening at http://${host}:${port}...`);
});