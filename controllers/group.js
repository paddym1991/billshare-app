'use strict';

const accounts = require ('./accounts.js');
const logger = require('../utils/logger');
const groupStore = require('../models/group-store');
const uuid = require('uuid');



const group = {
  index(request, response) {
    const groupId = request.params.id;
    logger.debug('Group id = ', groupId);
    const loggedInUser = accounts.getCurrentUser(request);
    const viewData = {
      title: 'Group',
      group: groupStore.getGroup(groupId),
      user: loggedInUser,
    };
    response.render('group', viewData);
  },

  addMember(request, response) {
    let user = accounts.getCurrentUser(request);
    const groupId = request.params.id;
    const group = groupStore.getGroup(groupId);
    const newMember= {
      id: uuid(),
      name: request.body.name,
      email: request.body.email,
    };
    logger.debug('New Member = ', newMember);
    groupStore.addMember(groupId, newMember);
    response.redirect('/dashboard/' + groupId);
  },

  deleteMember(request, response) {
    const groupId = request.params.id;
    const memberId = request.params.memberid;
    logger.debug(`Deleting Member ${memberId} from Group ${groupId}`);
    groupStore.removeMember(groupId, memberId);
    response.redirect('/dashoard/' + groupId);
  },

}