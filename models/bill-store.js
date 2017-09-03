'use strict';

const _ = require('lodash');
const JsonStore = require('./json-store');
const groupStore = require('../models/group-store');

const billStore = {


  store: new JsonStore('./models/bill-store.json', { billCollection: [] }),
  collection: 'billCollection',

  getAllBillss() {
    return this.store.findAll(this.collection);
  },

  getBill(id) {
    return this.store.findOneBy(this.collection, { id: id });
  },

  addBill(id, bill) {
    this.store.add(this.collection, bill);
    this.store.save();
  },

  removeBill(id) {
    const bill = this.getBill(id);
    this.store.remove(this.collection, bill);
    this.store.save();
  },

  getGroupBills(groupId) {
    return this.store.findBy(this.collection, { groupid: groupId });
  },

};

module.exports = billStore;