const path = require('path');
const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const users = require('./users')();

app.use('/dist', express.static(path.join(__dirname, '/dist')));

app.get('/', (req, res) => {
  console.log(req.url);
  res.sendFile('index.html', {
    root: 'public'
  });
});

// Sockets...
io.on('connection', (client) => {
  const clientId = client.id;

  client.on('validateName', (pattern, callback) => {
    let userExists;
    if (Object.entries(users.members)) {
      userExists = Object.values(users.members).find(member => {
        return member.name.startsWith(pattern)
      });
    }
    callback(userExists ? false : pattern);
  })

  client.on('registerUser', (userName) => {
    users.add(clientId, userName);
    console.log(users.members);
    io.emit('updateUsers', users.members);
  });

  client.on('userMessage', (data) => {
    io.emit('receiveMessage', {
      client: clientId,
      data: data
    });
  });

  client.on('disconnect', () => {
    if (users.members[clientId]) {
      client.broadcast.emit('userDepart', users.members[clientId].name);
      users.delete(clientId);
    }
    io.emit('updateUsers', users.members);
    console.log(users.members);
  });
});

const port = process.env.PORT || 3000;
const host = process.env.HOST || 'localhost';

server.listen(port, () => {
  console.log(`server listening at http://${host}:${port}...`);
});