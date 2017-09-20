'use strict';

module.exports = function(app) {
  var controller = require('./controller');

  app.route('/metrics').get(controller.last);
  app.route('/metrics/:year').get(controller.year);
  app.route('/metrics/:year/:month').get(controller.month);
  app.route('/metrics/:year/:month/:date').get(controller.date);
};