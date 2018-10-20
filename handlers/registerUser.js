module.exports = (io, db, clientId, userName) => {
  db.add(clientId, userName);
  io.emit('updateUsers', db.members);
}