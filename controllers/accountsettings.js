'use strict';

const accounts = require ('./accounts.js');
const logger = require('../utils/logger');
const userStore = require('../models/user-store');
const uuid = require('uuid');

const accountsettings = {
  index(request, response) {
    logger.info('account settings rendering');
    const loggedInUser = accounts.getCurrentUser(request);
    const viewData = {
      title: 'Profile settings',
      user: loggedInUser,
    };
    logger.info('abount to render', loggedInUser);
    response.render('accountsettings', viewData);
  },
  update(request, response) {
    let user = accounts.getCurrentUser(request);
    const updateUser = request.body;

    user.firstName = updateUser.firstName;
    user.lastName = updateUser.lastName;
    user.email = updateUser.email;
    user.password = updateUser.password;

    logger.info(`updating ${user.email}`);
    response.redirect('/dashboard');
  },
};

module.exports = accountsettings;