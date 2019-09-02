'use strict';
module.exports = function(app) {
  var UserController = require('../Controller/UserController');
	app.route('/users')
		.get(UserController.list_users)
		.post(UserController.new_user);

	app.route('/users/:id_user')
		.put(UserController.update_user);

	app.route('/users/:nickname')
		.get(UserController.list_by_nickname);
}