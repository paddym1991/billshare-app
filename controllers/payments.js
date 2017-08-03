'use strict';

const logger = require('../utils/logger');
const paymentStore = require('../models/payment-store');
const uuid = require('uuid');

const payments = {
  index(request, response) {
    const paymentsId = request.params.id;
    logger.debug('Payment id = ', paymentsId);
    const viewData = {
      title: 'Payment',
      payments: paymentStore.getPayments(paymentsId),
    };
    response.render('payments', viewData);
  },

  deletePayment(request, response) {
    const paymentsId = request.params.id;
    const paymentId = request.params.paymentid;
    logger.debug(`Deleting Payment ${paymentId} from Payments ${paymentsId}`);
    paymentStore.removePayment(paymentsId, paymentId);
    response.redirect('/payments/' + paymentsId);
  },

  addPayment(request, response) {
    const paymentsId = request.params.id;
    const payments = paymentStore.getPayments(paymentsId);
    const newPayment= {
      id: uuid(),
      title: request.body.title,
      payer: request.body.payer,
      amount: Number(request.body.amount),
    };
    logger.debug('New Payment = ', newPayment);
    paymentStore.addPayment(paymentsId, newPayment);
    response.redirect('/payments/' + paymentsId);
  },
};

module.exports = payments;
