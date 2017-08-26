'use strict';

const _ = require('lodash');
const JsonStore = require('./json-store');
const groupStore = require('../models/group-store');

const expenseStore = {

  store: new JsonStore('./models/expense-store.json', { expenseCollection: [] }),
  collection: 'expenseCollection',

  getAllExpenses() {
    return this.store.findAll(this.collection);
  },

  getExpense(id) {
    return this.store.findOneBy(this.collection, { id: id });
  },

  getUserExpenses(userId) {
    return this.store.findBy(this.collection, { userid: userId });
  },

  getGroupExpenses(groupId) {
    return this.store.findBy(this.collection, { groupid: groupId });
  },
  /*
    addExpense(expense) {
      this.store.add(this.collection, expense);
      this.store.save();
    },
    */

  addExpense(id, expense) {
    this.store.add(this.collection, expense);
    this.store.save();
  },

  removeExpense(id) {
    const expense = this.getExpense(id);
    this.store.remove(this.collection, expense);
    this.store.save();
  },

  removeAllExpenses() {
    this.store.removeAll(this.collection);
    this.store.save();
  },

  addPayment(id, payment) {
    const expense = this.getExpense(id);
    expense.payments.push(payment);
    const group = groupStore.getGroup(expense.groupid);

    let total = 0;
    for (let i = 0; i < expense.payments.length; i++) {
      total += expense.payments[i].amount;
    }

    const splitTotal = payment.amount;
    const split = ((splitTotal) / (group.members.length)).toFixed(2);
    payment.splitTotal = splitTotal;
    payment.split = split;
    /*
    let splitTotal = 0;
    for (let i = 0; i < expense.payments.length; i++) {
      splitTotal = expense.payments[i].amount;
    }
    expense.splitTotal = splitTotal;

    let split = 0;
    for (let i = 0; i < expense.payments.length; i++) {
      split = (splitTotal / (group.members.length));
    }
    expense.split = split;
    */
    expense.total = total;
    this.store.save();
  },

  getPaymentById(id) {
    return this.store.findOneBy(this.collection, { id: id });
  },

  removePayment(userId, paymentid) {
    const expense = this.getExpense(userId);
    const payments = expense[0].payments;
    _.remove(payments, { id: paymentid});
    this.store.save();
  },
};

module.exports = expenseStore;
'use strict';

const _ = require('lodash');
const JsonStore = require('./json-store');
const groupStore = require('../models/group-store');

const expenseStore = {

  store: new JsonStore('./models/expense-store.json', { expenseCollection: [] }),
  collection: 'expenseCollection',

  getAllExpenses() {
    return this.store.findAll(this.collection);
  },

  getExpense(id) {
    return this.store.findOneBy(this.collection, { id: id });
  },

  getUserExpenses(userId) {
    return this.store.findBy(this.collection, { userid: userId });
  },

  getGroupExpenses(groupId) {
    return this.store.findBy(this.collection, { groupid: groupId });
  },
  /*
    addExpense(expense) {
      this.store.add(this.collection, expense);
      this.store.save();
    },
    */

  addExpense(id, expense) {
    this.store.add(this.collection, expense);
    this.store.save();
  },

  removeExpense(id) {
    const expense = this.getExpense(id);
    this.store.remove(this.collection, expense);
    this.store.save();
  },

  removeAllExpenses() {
    this.store.removeAll(this.collection);
    this.store.save();
  },

  addPayment(id, payment) {
    const expense = this.getExpense(id);
    expense.payments.push(payment);
    const group = groupStore.getGroup(expense.groupid);
    const payer = payment.payer;

    let total = 0;
    for (let i = 0; i < expense.payments.length; i++) {
      total += expense.payments[i].amount;
    }
    expense.total = total;

    const splitTotal = payment.amount;
    const split = ((splitTotal) / (group.members.length)).toFixed(2);
    payment.splitTotal = splitTotal;
    payment.split = split;

    let memberOwedTotal = 0;
    for (let i = 0; i < expense.payments.length; i++) {
      memberOwedTotal += (payment.split * (group.members.length - 1)).toFixed(2);
    }
    expense.memberOwedTotal = memberOwedTotal;



    const paid = splitTotal;
    const owed = (split * (group.members.length - 1)).toFixed(2);
    const owedByMember = split;
    payment.paid = paid;
    payment.owed = owed;
    payment.owedByMember = owedByMember;
    /*
    const member = group.getMember
    let moneyOwed = 0;
    for (let i = 0; i < group.members.length; i++) {
      //if (group.member.firstname !== payment.payer) {
      if (!payer){
        member.moneyOwed = payment.split;
    }
    }
    */

    /*
    let splitTotal = 0;
    for (let i = 0; i < expense.payments.length; i++) {
      splitTotal = expense.payments[i].amount;
    }
    expense.splitTotal = splitTotal;

    let split = 0;
    for (let i = 0; i < expense.payments.length; i++) {
      split = (splitTotal / (group.members.length));
    }
    expense.split = split;
    */
    this.store.save();
  },

  getPaymentById(id) {
    return this.store.findOneBy(this.collection, { id: id });
  },

  removePayment(userId, paymentid) {
    const expense = this.getExpense(userId);
    const payments = expense[0].payments;
    _.remove(payments, { id: paymentid});
    this.store.save();
  },
};

module.exports = expenseStore;
