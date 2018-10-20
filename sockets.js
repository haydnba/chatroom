const socket = require('socket.io');
const users = require('./users');



module.exports = (server) => {
  const io = socket(server);
  const db = users();

  io.on('connection', (client) => {

    client.on('validateName', (pattern, callback) => {
      let userExists;
      if (Object.entries(db.members)) {
        userExists = Object.values(db.members).find(member => {
          return member.name.startsWith(pattern)
        });
      }
      callback(userExists ? false : pattern);
    });

    client.on('registerUser', (userName) => {
      db.add(client.id, userName);
      io.emit('updateUsers', db.members);
    });

    client.on('userMessage', (data) => {
      io.emit('receiveMessage', {
        client: client.id,
        data: data
      });
    });

    client.on('disconnect', () => {
      if (db.members[client.id]) {
        io.emit('userDepart', db.members[client.id].name);
        db.delete(client.id);
      }
      io.emit('updateUsers', db.members);
    });

  });
}
