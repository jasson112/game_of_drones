'use strict';

var UserModel = require('../Entity/user');

exports.list_users = function(req, res) {
	const User = new UserModel();
	User.find({
		table:"user"
	}, function(err, user) {
		if (err){
		  res.send(err);
		}else{
			res.json(user);	
		}
	});
};

exports.list_by_nickname = function(req, res) {
	const User = new UserModel();
	User.find({
		table:"user",
		where:[
		    req.params
		]
	}, function(err, user) {
		if (err){
		  res.send(err);
		}else{
			res.json(user);	
		}
	});
};

exports.new_user = function(req, res) {
	const User = new UserModel(req.body);

	User.find({
		table:"user",
		where:[
		    {
		      nickname:User._nickname
		    }
		]
	}, function(err, user_check) {
		if (err){
		  res.send(err);
		}else{
			if(user_check.length > 0){
				res.json(user_check);	
			}else{
				User.new(User, function(err, task) {
					if (err)
					  res.send(err);
					res.json(task);
				});
			}
		}
	});
};

exports.update_user = function(req, res) {
	var User = new UserModel();

	User.find({
		table:"user",
		where:[
		    req.params
		]
	}, function(err, user_check) {
		if (err){
		  res.send(err);
		}else{
			if(user_check.length > 0){
				Object.keys(req.body).forEach(param => {
					user_check[user_check.length - 1][param] = req.body[param]
				})
				
				User.update(user_check[user_check.length - 1], function(err, task) {
					if (err)
					  res.send(err);
					res.json(task);
				});
			}
		}
	});
};