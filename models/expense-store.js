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

  getMemberExpenses(memberId) {
    return this.store.findBy(this.collection, { memberid: memberId });
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
      memberOwedTotal += (split * (group.members.length - 1));
    }
    expense.memberOwedTotal = memberOwedTotal;



    const paid = splitTotal;
    const owed = ((split) * (group.members.length - 1)).toFixed(2);
    const owedByMember = split;
    payment.paid = paid;
    payment.owed = owed;
    payment.owedByMember = owedByMember;

    /*
    let payerTotal = 0;
    for(let i = 0; i < expense.payments.length; i++) {
      for (let i = 0; i < expense.members.length; i++)
      if(expense.members[i].firstname && expense.members[i].lastname === expense.payments[i].payer) {
        payerTotal += expense.payments[i].amount;
      }
    }
    payment.payerTotal = payerTotal;
    */
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

  getMemberPayments(expenseId, paymentId) {
    const expense = expenseStore.getExpense(expenseId);
    const members = payment.members;
    const member = payment.member;
    const payments = expense.payments;
    const payment = expenseStore.getPaymentById(paymentId);
    const payer = payment.payer;
    for(let i = 0; i < payments.length; i++){
      for(let i = 0; i < payment.members.length; i++) {
        if ((payer.firstname === member.firstname) && (payer.lastname === member.lastname)) {
          return payment.amount;
        }
      }
    }
  },


  getPaymentById(id) {
    return this.store.findOneBy(this.collection, { id: id });
  },

  getPayerPayments(expenseId, payer) {
    const expense = this.getExpense(expenseId);
    const payments = expense.payments;
    for (let i = 0; i < payments.length; i++) {
      if (payments[i].payer = payer) {
        return payments[i];
      }
    }
    return payments;
  },

  getUserExpenses(userId) {
    return this.store.findBy(this.collection, { userid: userId });
  },

  getGroupMembers(groupId) {
    const group = groupStore.getGroup(groupId);
    const members = group.members;
    return members;
  },

  getMemberById(id) {
    return this.store.findOneBy(this.collection, { id: id });
  },

  removePayment(id, paymentId) {
    const expense = this.getExpense(id);
    const payments = expense.payments;
    _.remove(payments, { id: paymentId});
    this.store.save();
  },
};

module.exports = expenseStore;