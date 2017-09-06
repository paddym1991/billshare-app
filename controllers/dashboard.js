'use strict';

const accounts = require ('./accounts.js');
const logger = require('../utils/logger');
const groupStore = require('../models/group-store');
const uuid = require('uuid');

const dashboard = {
  index(request, response) {
    logger.info('dashboard rendering');
    const loggedInUser = accounts.getCurrentUser(request);
    const viewData = {
      title: 'Billshare Dashboard',
      groups: groupStore.getUserGroups(loggedInUser.id),
      user: loggedInUser,
    };
    logger.info('about to render', groupStore.getAllGroups());
    response.render('dashboard', viewData);
  },

  deleteGroup(request, response) {
    const groupId = request.params.id;
    logger.debug(`Deleting Group ${groupId}`);
    groupStore.removeGroup(groupId);
    response.redirect('/dashboard');
  },

  addGroup(request, response) {
    const loggedInUser = accounts.getCurrentUser(request);
    const newGroup = {
      id: uuid(),
      userid: loggedInUser.id,
      title: request.body.title,
      expenses: [],
      members: [],
      bills: [],
    };
    logger.debug('Creating a new Group', newGroup);
    groupStore.addGroup(newGroup);
    response.redirect('/dashboard');
  },

  getCurrentGroup(request) {
    const groupId = request.cookies.expense;
    return groupStore.getGroup(groupId);
  },
};

module.exports = dashboard;

/*
'use strict';

const accounts = require ('./accounts.js');
const logger = require('../utils/logger');
const expenseStore = require('../models/expense-store');
const uuid = require('uuid');
const groupStore = require('../models/group-store');
const userStore = require('../models/user-store');


const dashboard = {
  index(request, response) {
    logger.info('dashboard rendering');
    const loggedInUser = accounts.getCurrentUser(request);
    const groupList = groupStore.getUserGroupList(loggedInUser);
    const viewData = {
      title: 'Billshare Dashboard',
      user: loggedInUser,
      grouplist: groupList,
      expenses: expenseStore.getUserExpenses(loggedInUser),
    };
    logger.info('about to render', viewData);
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
  
  addGroup(request, response) {
    
    const userId = request.params.id;
    
    const newGroup = {
      id: uuid(),
      group: request.body.group,
      members: [],
      expenses: [],
    };
    logger.debug('Creating a new Group', newGroup);
    groupStore.addGroup(userId, newGroup);
    response.redirect('/dashboard');
  },
  
  /*
  addGroup(request, response) {
    const loggedInUser = accounts.getCurrentUser(request);
    const newGroup = {
      id: uuid(),
      userid: loggedInUser.id,
      title: request.body.title,
      members: [],
      expenses: [],
    };
    logger.debug('Creating a new Group', newGroup);
    groupStore.addGroup(newGroup);
    response.redirect('/dashboard');
  },

  
  deleteGroup(request, response) {
    const groupId = request.params.id;
    logger.debug(`Deleting Group ${groupId}`);
    groupStore.removeGroup(groupId);
    response.redirect('/dashboard');
  },
};

module.exports = dashboard;
*/