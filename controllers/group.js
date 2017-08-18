'use strict';

const accounts = require ('./accounts.js');
const logger = require('../utils/logger');
const groupStore = require('../models/group-store');
const expenseStore = require('../models/expense-store');
const uuid = require('uuid');


const group = {
  index(request, response) {
    const groupId = request.params.id;
    logger.debug('Group id = ', groupId);
    const viewData = {
      title: 'Group',
      group: groupStore.getGroup(groupId),
    };
    response.render('group', viewData);
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
      userid: loggedInUser,
      title: request.body.title,
      payments: [],
    };
    logger.debug('Creating a new Expense', newExpense);
    expenseStore.addExpense(newExpense);
    response.redirect('/dashboard');
  },

  addMember(request, response) {
    const groupId = request.params.id;
    const group = groupStore.getGroup(groupId);
    const newMember= {
      id: uuid(),
      name: request.body.name,
      email: request.body.email,
    };
    logger.debug('New Member = ', newMember);
    groupStore.addMember(groupId, newMember);
    response.redirect('/dashboard/' + groupId);
  },

  deleteMember(request, response) {
    const groupId = request.params.id;
    const memberId = request.params.memberid;
    logger.debug(`Deleting Member ${memberId} from Group ${groupId}`);
    groupStore.removeMember(groupId, memberId);
    response.redirect('/dashoard/' + groupId);
  },
};


module.exports = group;

/*
'use strict';

const accounts = require ('./accounts.js');
const logger = require('../utils/logger');
const groupStore = require('../models/group-store');
const uuid = require('uuid');
const expenseStore = require('../models/expense-store');
const userStore = require('../models/user-store');

const group = {
  index(request, response) {
    const groupId = request.params.id;
    logger.debug('Group id = ', groupId);
    const viewData = {
      title: 'Group',
      group: groupStore.getGroup(groupId),
    };
    response.render('group', viewData);
  },

  addExpense(request, response) {
    const groupId = request.params.id;
    const group = groupStore.getGroup(groupId);
    const newExpense = {
      id: uuid(),
      title: request.body.title,
      payments: [],
    };
    logger.debug('New Expense = ', newExpense);
    groupStore.addExpense(groupId, newExpense);
    response.redirect('/group/' + groupId);
  },

  addExpense(request, response) {
    const loggedInUser = accounts.getCurrentUser(request);
    const newExpense = {
      id: uuid(),
      userid: loggedInUser,
      title: request.body.title,
      payments: [],
    };
    logger.debug('Creating a new Expense', newExpense);
    expenseStore.addExpense(newExpense);
    response.redirect('/dashboard');
  },

  deleteExpense(request, response) {
    const groupId = request.params.id;
    const expenseId = request.params.expenseId;
    logger.debug(`Deleting Expense ${expenseId} from Group ${groupId}`);
    groupStore.removeExpense(groupId, expenseId);
    response.redirect('/group/' + groupId);
  },
};

/*
const group = {
  index(request, response) {
    logger.info('group rendering');
    const groupId = request.params.id;
    logger.debug('Group id = ', groupId);
    const loggedInUser = accounts.getCurrentUser(request);
    const thisGroup = group.getCurrentGroup(request);
    const viewData = {
      title: 'Group',
      group: groupStore.getGroup(groupId),
      expenses: expenseStore.getUserExpenses(loggedInUser.id),
      user: loggedInUser,
    };
    logger.info('about to render', expenseStore.getAllExpenses());
    response.render('group', viewData);
  },

  deleteExpense(request, response) {
    const groupId = request.params.id;
    const expenseId = request.params.id;
    logger.debug(`Deleting Expense ${expenseId}`);
    expenseStore.removeExpense(expenseId);
    response.redirect('/group/' + groupId);
  },

  addExpense(request, response) {
    const groupId = request.params.id;
    const group = groupStore.getGroup(groupId);
    const loggedInUser = accounts.getCurrentUser(request);
    const newExpense = {
      id: uuid(),
      userid: loggedInUser.id,
      title: request.body.title,
      payments: [],
    };
    logger.debug('Creating a new Expense', newExpense);
    expenseStore.addExpense(newExpense);
    response.redirect('/group/' + groupId);
  },



  addMember(request, response) {
    let user = accounts.getCurrentUser(request);
    const groupId = request.params.id;
    const group = groupStore.getGroup(groupId);
    const newMember= {
      id: uuid(),
      name: request.body.name,
      email: request.body.email,
    };
    logger.debug('New Member = ', newMember);
    groupStore.addMember(groupId, newMember);
    response.redirect('/dashboard/' + groupId);
  },

  deleteMember(request, response) {
    const groupId = request.params.id;
    const memberId = request.params.memberid;
    logger.debug(`Deleting Member ${memberId} from Group ${groupId}`);
    groupStore.removeMember(groupId, memberId);
    response.redirect('/dashoard/' + groupId);
  },

  getCurrentGroup(request) {
    const groupId = request.cookies.group
    return groupStore.getGroup(groupId);
  },
};


module.exports = group;
*/