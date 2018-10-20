module.exports = () => users = {
  members: {},

  add: (clientId, userName) => {
    const now = new Date();
    users.members[clientId] = {
      name: userName,
      joined: [
        now.toLocaleDateString(), 
        now.toLocaleTimeString()
      ]
    };
  },

  delete: (clientId) => {
    if (users.members[clientId] !== undefined) {
      delete users.members[clientId];
      users.count = users.count - 1;
    }
  }

}