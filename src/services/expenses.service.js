function uuid() {
  return Date.now();
}

let expenses = [];

function initExpenses() {
  expenses = [];
}

function getAll(queries) {
  const { userId, categories, from, to } = queries;

  let queriedExpenses = expenses;

  if (userId) {
    queriedExpenses = queriedExpenses.filter(
      (expense) => expense.userId === userId,
    );
  }

  if (categories) {
    queriedExpenses = queriedExpenses.filter((expense) => {
      return categories.includes(expense.category);
    });
  }

  if (from) {
    queriedExpenses = queriedExpenses.filter(
      ({ spentAt }) => new Date(spentAt) > new Date(from),
    );
  }

  if (to) {
    queriedExpenses = queriedExpenses.filter(
      ({ spentAt }) => new Date(spentAt) < new Date(to),
    );
  }

  return queriedExpenses;
}

function create(payload) {
  const expense = { id: uuid(), ...payload };

  expenses.push(expense);

  return expense;
}

function getById(id) {
  return expenses.find((expense) => expense.id === id);
}

function deleteById(id) {
  const index = expenses.findIndex((expense) => expense.id === id);

  if (index === -1) {
    return;
  }

  const [removedExpense] = expenses.splice(index, 1);

  return removedExpense;
}

function update({ id, ...payload }) {
  const expenseToUpdate = expenses.find((expense) => expense.id === id);

  if (!expenseToUpdate) {
    return;
  }

  return Object.assign(expenseToUpdate, { ...payload });
}

const expensesService = {
  initExpenses,
  getAll,
  getById,
  create,
  deleteById,
  update,
};

exports.expensesService = expensesService;
