const { usersService } = require('../services/users.service.js');
const { expensesService } = require('../services/expenses.service.js');

const getAll = async (req, res) => {
  const { userId, categories, from, to } = req.query;
  const expenses = await expensesService.getAll({
    userId: Number(userId),
    categories,
    from,
    to,
  });

  res.json(expenses);
};

const create = async (req, res) => {
  const { userId, spentAt, title, amount, category, note } = req.body;
  const user = await usersService.getById(userId);

  if (!userId || !user) {
    return res.sendStatus(400);
  }

  const expense = await expensesService.create({
    userId: userId,
    spentAt,
    title,
    amount,
    category,
    note,
  });

  res.status(201).json(expense);
};

const getOne = async (req, res) => {
  const expense = await expensesService.getById(Number(req.params.id));

  if (!expense) {
    return res.sendStatus(404);
  }

  res.json(expense);
};

const deleteOne = async (req, res) => {
  const expense = await expensesService.deleteById(
    Number(Number(req.params.id)),
  );

  if (!expense) {
    return res.sendStatus(404);
  }

  res.sendStatus(204);
};

const update = async (req, res) => {
  const expense = await expensesService.getById(Number(req.params.id));

  if (!expense) {
    return res.sendStatus(404);
  }

  const updatedExpense = await expensesService.update({
    id: Number(req.params.id),
    ...req.body,
  });

  res.json(updatedExpense);
};

const expensesController = {
  getAll,
  create,
  getOne,
  deleteOne,
  update,
};

exports.expensesController = expensesController;
