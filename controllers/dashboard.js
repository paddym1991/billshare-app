'use strict';

const accounts = require ('./accounts.js');
const logger = require('../utils/logger');
const paymentStore = require('../models/payment-store');
const uuid = require('uuid');


const dashboard = {
  index(request, response) {
    logger.info('dashboard rendering');
    const loggedInUser = accounts.getCurrentUser(request);
    const viewData = {
      title: 'Billshare Dashboard',
      payments: paymentStore.getUserPayments(loggedInUser.id),
      user: loggedInUser,
    };
    logger.info('about to render', paymentStore.getAllPaymentLists());
    response.render('dashboard', viewData);
  },

  deletePlaylist(request, response) {
    const playlistId = request.params.id;
    logger.debug(`Deleting Playlist ${playlistId}`);
    paymentStore.removePlaylist(playlistId);
    response.redirect('/dashboard');
  },

  addPayments(request, response) {
    const loggedInUser = accounts.getCurrentUser(request);
    const newPayment = {
      id: uuid(),
      userid: loggedInUser.id,
      title: request.body.title,
      payments: [],
    };
    logger.debug('Creating a new PaymentList', newPayment);
    paymentStore.addPayment(newPayment);
    response.redirect('/dashboard');
  },

  addPayment(request, response) {

  }
};

module.exports = dashboard;
