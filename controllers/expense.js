'use strict';

const logger = require('../utils/logger');
const expenseStore = require('../models/expense-store');
const groupStore = require('../models/group-store');
const uuid = require('uuid');

const expense = {
  index(request, response) {
    const expenseId = request.params.id;
    const payments = request.params.payments;
    const members = request.params.members;
    const groupId = request.params.groupid;
    logger.debug('Expense id = ', expenseId);
    const viewData = {
      title: 'Expense',
      expense: expenseStore.getExpense(expenseId),
      payments: payments,
      members: members,
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
    const members = request.params.members;
    const date = new Date(request.body.date);
    const newPayment = {
      id: uuid(),
      expenseid: expenseId,
      members: members,
      date: date.toDateString(),
      title: request.body.title,
      payer: request.body.payer,
      amount: Number(request.body.amount),
    };
    logger.debug('New Payment = ', newPayment);
    expenseStore.addPayment(expenseId, newPayment);
    response.redirect('/expense/' + expenseId);
  },

  paymentBalance(request, response) {
    const expenseId = request.params.id;
    const expense = expenseStore.getExpense(expenseId);
    const payments =  expense.payments;
  },

  memberPayments(request, response) { //-----------------------------------------------------------> memberBookings method, called when ‘/ dashboard’ request received
    logger.info('member payments rendering');
    const expenseId = request.params.id;
    const expense = expenseStore.getExpense(expenseId);//--------------------------------------------------> logs message to console
    const members = expense.members;
    const memberId = members.params.id;
    const member = groupStore.getMemberById(memberId);
    const member1 = expense.payer;
    const payments = expense.payments;
    const paymentId = payments.params.id;
    //----------------------------------> gets currentMember from accounts and stores it in member
    const viewData = { //--------------------------------------------------------------------------> place model in viewData object
      expense: expense, //-------------------------------------------------------------------> loggedInMember
      member: member, //-----------------------------------------------------------------> trainerList
      member1: member1,
      payments: payments,
    };
    logger.debug(`create payments rendered for ${member1.firstname}`); //--------------> logs message to console
    expenseStore.getMemberPayments(expenseId, paymentId, memberId);
    response.render('memberPayments', viewData); //------------------------------------------------> renders 'memberBookings' and viewData to view
  },

  memberPayments(request, response) {
    const expenseId = request.params.id;
  }
};

module.exports = expense;