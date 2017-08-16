'use strict';

const express = require('express');
const router = express.Router();

const accounts = require('./controllers/accounts.js');
const dashboard = require('./controllers/dashboard.js');
const about = require('./controllers/about.js');
const expense = require('./controllers/expense.js');
const group = require('./controllers/group.js');
const accountsettings = require('./controllers/accountsettings.js');

router.get('/', accounts.index);
router.get('/login', accounts.login);
router.get('/signup', accounts.signup);
router.get('/logout', accounts.logout);
router.post('/register', accounts.register);
router.post('/authenticate', accounts.authenticate);

router.get('/dashboard', dashboard.index);
router.get('/dashboard/deleteexpense/:id', dashboard.deleteExpense);
router.get('/dashboard/deletegroup/:id', dashboard.deleteGroup);
router.post('/dashboard/addexpense', dashboard.addExpense);
router.post('/dashboard/addgroup', dashboard.addGroup);

router.get('/about', about.index);
router.get('/expense/:id', expense.index);
router.get('/expense/:id/deletepayment/:paymentid', expense.deletePayment);
router.post('/expense/:id/addpayment', expense.addPayment);

router.get('/group/:id', group.index);


router.get('/accountsettings', accountsettings.index);
router.post('/accountsettings/update', accountsettings.update);


module.exports = router;
