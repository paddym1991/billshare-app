'use strict';

const logger = require('../utils/logger');

const about = {
  index(request, response) {
    logger.info('about rendering');
    const viewData = {
      title: 'About Billshare',
    };
    response.render('about', viewData);
  },
};

module.exports = about;
