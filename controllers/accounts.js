'use strict';

const userstore = require('../models/user-store');
const expensestore = require('../models/expense-store');
const logger = require('../utils/logger');
const uuid = require('uuid');
const groupStore = require('../models/group-store');
const userStore = require('../models/user-store');

const accounts = {

  index(request, response) {
    const viewData = {
      title: 'Login or Signup',
    };
    response.render('index', viewData);
  },

  login(request, response) {
    const viewData = {
      title: 'Login to the Service',
    };
    response.render('login', viewData);
  },

  logout(request, response) {
    response.cookie('group', '');
    response.redirect('/');
  },

  signup(request, response) {
    const viewData = {
      title: 'Login to the Service',
    };
    response.render('signup', viewData);
  },

  /*
  register(request, response) {

    const user = {
    id: uuid(),
    email: request.body.email,
    password: request.body.password,
    name: {
      first: request.body.firstName,
      last:request.body.lastName,
    },
    groups: [],
    };
    user.name.full = user.name.first + ' ' + user.name.last;
    userStore.addUser(user);
    logger.info('registering ${user.email}');
    response.redirect('/login');
    },
  */

  register(request, response) {
    const user = request.body;
    user.id = uuid();
    userStore.addUser(user);
    logger.info(`registering ${user.email}`);
    response.redirect('/');
  },



  /*
  register(request, response) {

    const user = request.body;
    user.id = uuid();
    userstore.addUser(user);
    logger.info(`registering ${user.email}`);

    const newGroupList = {
      id: uuid(),
      userid: user.id,
      groups: [],
    };
    logger.info('Creating a new Group List', newGroupList);
    groupStore.addGroupList(newGroupList);

    response.redirect('/');
  },
*/

  authenticate(request, response) {
    const user = userstore.getUserByEmail(request.body.email);
    if (user) {
      response.cookie('group', user.email);
      logger.info(`logging in ${user.email}`);
      response.redirect('/dashboard');
    } else {
      response.redirect('/login');
    }
  },

  getCurrentUser(request) {
    const userEmail = request.cookies.group;
    return userStore.getUserByEmail(userEmail);
  },
};

module.exports = accounts;
