'use strict';

const _ = require('lodash');
const JsonStore = require('./json-store');

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

    let total = 0;
    for (let i = 0; i < expense.payments.length; i++) {
      total += expense.payments[i].amount;
    }

    expense.total = total;
    this.store.save();
  },


  removePayment(userId, paymentid) {
    const expense = this.getExpense(userId);
    const payments = expense[0].payments;
    _.remove(payments, { id: paymentid});
    this.store.save();
  },
};

module.exports = expenseStore;
