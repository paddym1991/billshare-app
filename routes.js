'use strict';

const express = require('express');
const router = express.Router();

const accounts = require('./controllers/accounts.js');
const dashboard = require('./controllers/dashboard.js');
const about = require('./controllers/about.js');
const expense = require('./controllers/expense.js');

router.get('/', accounts.index);
router.get('/login', accounts.login);
router.get('/signup', accounts.signup);
router.get('/logout', accounts.logout);
router.post('/register', accounts.register);
router.post('/authenticate', accounts.authenticate);

router.get('/dashboard', dashboard.index);
router.get('/dashboard/deleteexpense/:id', dashboard.deleteExpense);
router.post('/dashboard/addexpense', dashboard.addExpense);

router.get('/about', about.index);
router.get('/expense/:id', expense.index);
router.get('/expense/:id/deletePayment/:paymentId', expense.deletePayment);
router.post('/payments/:id/addpayment, playlist.addExpense');


module.exports = router;
