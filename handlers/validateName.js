module.exports = (db, pattern, callback) => {
  let userExists;
  if (Object.entries(db.members)) {
    userExists = Object.values(db.members).find(member => {
      return member.name.startsWith(pattern)
    });
  }
  callback(userExists ? false : pattern);
}