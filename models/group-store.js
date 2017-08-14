'use strict';

const _ = require('lodash');
const JsonStore = require('./json-store');

const groupStore = {

  store: new JsonStore('./models/group-store.json', { groupCollection: [] }),
  collection: 'groupCollection',

  getAllgroups() {
    return this.store.findAll(this.collection);
  },

  getGroup(id) {
    return this.store.findOneBy(this.collection, { id: id });
  },

  getUserGroups(userId) {
    return this.store.findBy(this.collection, { userid: userId });
  },

  addGroup(group) {
    this.store.add(this.collection, group);
  },

  removeGroup(id) {
    const group = this.getGroup(id);
    this.store.remove(this.collection, group);
    this.store.save();
  },

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


};
