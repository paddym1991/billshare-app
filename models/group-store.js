'use strict';

const _ = require('lodash');
const JsonStore = require('./json-store');
const logger = require('../utils/logger');
const userStore = require('../models/user-store');

const groupStore = {

  store: new JsonStore('./models/group-store.json', { groupCollection: [] }),
  collection: 'groupCollection',

  getAllGroups() {
    return this.store.findAll(this.collection);
  },

  getGroupList(id) {
    return this.store.findOneBy(this.collection, { id: id });
  },

  getGroup(id) {
    return this.store.findOneBy(this.collection, { id: id });
  },

  getUserGroups(userId) {
    return this.store.findBy(this.collection, { userid: userId });
  },

  getUserGroupList(userId) {
    return this.store.findBy(this.collection, { userid: userId });
  },

  addGroupList(groupList) {
    this.store.add(this.collection, groupList);
    this.store.save();
  },

  removeGroupList(id) {
    const group = this.getGroupList(id);
    this.store.remove(this.collection, group);
    this.store.save();
  },


  addGroup(group) {
    this.store.add(this.collection, group);
    this.store.save();
  },

  /*
  addGroup(userId, newGroup) {
    const groupList = this.getUserGroupList(userId);
    logger.debug(`groupList `, groupList);
    groupList[0].groupList.push(newGroup);
    this.store.save();
  },
  */


  removeGroup(id) {
    const group = this.getGroup(id);
    this.store.remove(this.collection, group);
    this.store.save();
  },

  addExpense(id, expense) {
    this.store.add(this.collection, expense);
    this.store.save();
  },

  /*
  removeGroup(id) {
    const group = this.getGroup(id);
    this.store.remove(this.collection, group);
    this.store.save();
  },
  */

  removeAllGroups() {
    this.store.removeAll(this.collection);
    this.store.save();
  },

  addMember(id, member) {
    const group = this.getGroup(id);
    group.members.push(member);
    this.store.save();
  },

  removeMember(userId, memberid) {
    const group = this.getGroup(userId);
    const members = group[0].members;
    _.remove(members, { id: memberid});
    this.store.save();
  },

  getMemberById(id) {
    return this.store.findOneBy(this.collection, { id: id });
  },
  /*
  addExpense(id, expense) {
    const group = this.getGroup(id);
    group.expenses.push(expense);
    this.store.save();
  },
  */
  removeExpense(id, expenseId) {
    const group = this.getgroup(id);
    const expenses = group.expenses;
    _.remove(expenses, { id: expenseId});
    this.store.save();
  },
};

module.exports = groupStore;
