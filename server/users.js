const users = [];

const addNewUser = ({ id, email, sessionName, name, photo, isAdmin }) => {
  const user = { id, email, sessionName, name, photo, isAdmin };
  const existingUser = users.find(
    (user) => user.email === email && user.sessionName === sessionName
  );
  if (!existingUser) {
    users.push(user);
    return user;
  }
};

const getAllUsers = (sessionName) => {
  const userList = users.filter((user) => user.sessionName === sessionName);
  return userList;
};

const disconnectUser = (id) => {
  const index = users.findIndex((user) => user.id === id);
  if (index !== -1) {
    return users.splice(index, 1)[0];
  }
};

const getUserById = (id) => {
  return users.find((user) => user.id === id);
};

module.exports = {
  addNewUser,
  getAllUsers,
  disconnectUser,
  getUserById,
};
