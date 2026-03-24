const { usersService } = require('../services/users.service.js');

const getAll = async (req, res) => {
  const users = await usersService.getAll();

  res.json(users);
};

const create = async (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res.sendStatus(400);
  }

  const user = await usersService.create(name);

  res.status(201).json(user);
};

const getOne = async (req, res) => {
  const user = await usersService.getById(Number(req.params.id));

  if (!user) {
    return res.sendStatus(404);
  }

  res.json(user);
};

const deleteOne = async (req, res) => {
  const user = await usersService.deleteById(Number(req.params.id));

  if (!user) {
    return res.sendStatus(404);
  }

  res.sendStatus(204);
};

const update = async (req, res) => {
  const { id } = req.params;
  const user = await usersService.getById(Number(id));

  if (!user) {
    return res.sendStatus(404);
  }

  const updatedUser = await usersService.update({
    id: Number(id),
    name: req.body.name,
  });

  res.json(updatedUser);
};

const usersController = {
  getAll,
  create,
  getOne,
  deleteOne,
  update,
};

exports.usersController = usersController;
