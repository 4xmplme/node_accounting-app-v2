'use strict';

const express = require('express');
const { usersRouter } = require('./routes/users.route');
const { expensesRouter } = require('./routes/expenses.route');
const { usersService } = require('./services/users.service');
const { expensesService } = require('./services/expenses.service');

function createServer() {
  const app = express();

  usersService.initUsers();
  expensesService.initExpenses();
  app.use(express.json());
  app.use('/users', usersRouter);
  app.use('/expenses', expensesRouter);

  return app;
}

module.exports = {
  createServer,
};
