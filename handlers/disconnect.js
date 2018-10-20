module.exports = (io, db, clientId) => {
  if (db.members[clientId]) {
    io.emit('userDepart', db.members[clientId].name);
    db.delete(clientId);
  }
  io.emit('updateUsers', db.members);
}
