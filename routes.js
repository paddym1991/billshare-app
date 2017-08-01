'use strict';

const express = require('express');
const router = express.Router();

const accounts = require('./controllers/accounts.js');
const dashboard = require('./controllers/dashboard.js');
const about = require('./controllers/about.js');
const payments = require('./controllers/payments.js');

router.get('/', accounts.index);
router.get('/login', accounts.login);
router.get('/signup', accounts.signup);
router.get('/logout', accounts.logout);
router.post('/register', accounts.register);
router.post('/authenticate', accounts.authenticate);

router.get('/dashboard', dashboard.index);
router.get('/dashboard/deleteplaylist/:id', dashboard.deletePlaylist);
router.post('/dashboard/addpayment', dashboard.addPayment);

router.get('/about', about.index);
router.get('/payments/:id', payments.index);
router.get('/payments/:id/deletePayment/:paymentId', payments.deletePayment);
router.post('/payments/:id/addpayment, playlist.addPayment');

module.exports = router;
