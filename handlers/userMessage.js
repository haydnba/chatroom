module.exports = (io, clientId, data) => {
  io.emit('receiveMessage', {
    client: clientId,
    data: data
  });
}
