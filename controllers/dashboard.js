'use strict';

const accounts = require ('./accounts.js');
const logger = require('../utils/logger');
const expenseStore = require('../models/expense-store');
const uuid = require('uuid');


const dashboard = {
  index(request, response) {
    logger.info('dashboard rendering');
    const loggedInUser = accounts.getCurrentUser(request);
    const viewData = {
      title: 'Billshare Dashboard',
      expenses: expenseStore.getUserExpenses(loggedInUser.id),
      user: loggedInUser.id,
    };
    logger.info('about to render', expenseStore.getAllExpenses());
    response.render('dashboard', viewData);
  },

  deleteExpense(request, response) {
    const expenseId = request.params.id;
    logger.debug(`Deleting Expense ${expenseId}`);
    expenseStore.removeExpense(expenseId);
    response.redirect('/dashboard');
  },

  addExpense(request, response) {
    const loggedInUser = accounts.getCurrentUser(request);
    const newExpense = {
      id: uuid(),
      userid: loggedInUser.id,
      title: request.body.title,
      payments: [],
    };
    logger.debug('Creating a new Expense', newExpense);
    expenseStore.addExpense(newExpense);
    response.redirect('/dashboard');
  },
};

module.exports = dashboard;
