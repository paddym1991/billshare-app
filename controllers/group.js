'use strict';

const logger = require('../utils/logger');
const groupStore = require('../models/group-store');
const expenseStore = require('../models/expense-store');
const billStore = require('../models/bill-store');
const uuid = require('uuid');
const accounts = require('./accounts.js');

const group = {
  index(request, response) {
    const loggedInUser = accounts.getCurrentUser(request);
    const groupId = request.params.id;
    const group = groupStore.getGroup(groupId);
    const members = group.members;
    logger.debug('Group id = ', groupId);
    const viewData = {
      title: 'Group',
      group: group,
      expenses: expenseStore.getGroupExpenses(groupId),
      user: loggedInUser,
      members: members,
      bills: billStore.getGroupBills(groupId),
    };
    response.render('group', viewData);
  },

  deleteExpense(request, response) {
    const groupId = request.params.id;
    const expenseId = request.params.expenseid;
    logger.debug(`Deleting Expense ${expenseId} from Group ${groupId}`);
    expenseStore.removeExpense(expenseId);
    response.redirect('/group/' + groupId);
  },

  addExpense(request, response) {
    const groupId = request.params.id;
    const group = groupStore.getGroup(groupId);
    const newExpense = {
      id: uuid(),
      groupid: groupId,
      title: request.body.title,
      members: groupStore.getGroupMembers(groupId),
      payments: [],
    };
    logger.debug('New Expense = ', newExpense);
    expenseStore.addExpense(groupId, newExpense);
    response.redirect('/group/' + groupId);
  },

  deleteMember(request, response) {
    const groupId = request.params.id;
    const memberId = request.params.memberid;
    logger.debug(`Deleting Member ${memberId} from Group ${groupId}`);
    groupStore.removeMember(groupId, memberId);
    response.redirect('/group/' + groupId);
  },

  deleteBillDue(request, response) {
    const groupId = request.params.id;
    const billId = request.params.billid;
    logger.debug(`Deleting Bill ${billId} from Group ${groupId}`);
    billStore.removeBill(groupId, billId);
    response.redirect('/group/' + groupId);
  },

  addBillDue(request, response) {
    const groupId = request.params.id;
    const group = groupStore.getGroup(groupId);
    const date = new Date(request.body.date);
    const newBill = {
      id: uuid(),
      groupid: groupId,
      date: date.toDateString(),
      title: request.body.title,
      amount: request.body.amount,
    };
    logger.debug('New Bill = ', newBill);
    billStore.addBill(groupId, newBill);
    response.redirect('/group/' + groupId);
  },

  addMember(request, response) {
    const groupId = request.params.id;
    const group = groupStore.getGroup(groupId);
    const newMember = {
      id: uuid(),
      groupid: groupId,
      firstname: request.body.firstName,
      lastname: request.body.lastName,
      email: request.body.email,
      payments: [],
    };
    logger.debug('New Member = ', newMember);
    groupStore.addMember(groupId, newMember);
    response.redirect('/group/' + groupId);
  },

  memberShare(request, response) {

  }
};

module.exports = group;
