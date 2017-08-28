'use strict';

const logger = require('../utils/logger');
const expenseStore = require('../models/expense-store');
const uuid = require('uuid');

const expense = {
  index(request, response) {
    const expenseId = request.params.id;
    logger.debug('Expense id = ', expenseId);
    const viewData = {
      title: 'Expense',
      expense: expenseStore.getExpense(expenseId),
    };
    response.render('expense', viewData);
  },

  deletePayment(request, response) {
    const expenseId = request.params.id;
    const paymentId = request.params.paymentid;
    logger.debug(`Deleting Payment ${paymentId} from Expense ${expenseId}`);
    expenseStore.removePayment(expenseId, paymentId);
    response.redirect('/expense/' + expenseId);
  },

  addPayment(request, response) {
    const expenseId = request.params.id;
    const expense = expenseStore.getExpense(expenseId);
    const newPayment= {
      id: uuid(),
      title: request.body.title,
      payer: request.body.payer,
      amount: Number(request.body.amount),
    };
    logger.debug('New Payment = ', newPayment);
    expenseStore.addPayment(expenseId, newPayment);
    response.redirect('/expense/' + expenseId);
  },
};

module.exports = expense;