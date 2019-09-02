'use strict';
module.exports = function(app) {
  var UserController = require('../Controller/WinController');
	app.route('/wins')
		.get(UserController.list_wins)
		.post(UserController.new_win);

	app.route('/wins/:id_win')
		.put(UserController.update_win);
}