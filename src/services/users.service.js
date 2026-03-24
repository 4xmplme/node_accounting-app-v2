function uuid() {
  return Date.now();
}

let users = [];

function initUsers() {
  users = [];
}

function getAll() {
  return users;
}

function create(name) {
  const user = { id: uuid(), name };

  users.push(user);

  return user;
}

function getById(id) {
  return users.find((user) => user.id === id);
}

function deleteById(id) {
  const index = users.findIndex((user) => user.id === id);

  if (index === -1) {
    return;
  }

  const [removedUser] = users.splice(index, 1);

  return removedUser;
}

function update({ id, name }) {
  const userToUpdate = users.find((user) => user.id === id);

  if (!userToUpdate) {
    return;
  }

  return Object.assign(userToUpdate, { name });
}

const usersService = {
  initUsers,
  getAll,
  getById,
  create,
  deleteById,
  update,
};

exports.usersService = usersService;
