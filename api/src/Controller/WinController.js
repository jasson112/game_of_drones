'use strict';

var ViewModel = require('../Entity/win');

exports.list_wins = function(req, res) {
	const View = new ViewModel();
	View.find({
		table:"user"
	}, function(err, user) {
		if (err){
		  res.send(err);
		}else{
			res.json(user);	
		}
	});
};

exports.new_win = function(req, res) {
	const View = new ViewModel(req.body);
	console.log("request body ", req.body)

	View.find({
		table:"view",
		where:[
		    {
		      move:View._move
		    }
		]
	}, function(err, view_check) {
		if (err){
		  res.send(err);
		}else{
			if(view_check.length > 0){
				res.json(view_check);	
			}else{
				View.new(View, function(err, task) {
					if (err)
					  res.send(err);
					res.json(task);
				});
			}
		}
	});
};

exports.update_win = function(req, res) {
	var View = new ViewModel();

	View.find({
		table:"user",
		where:[
		    req.params
		]
	}, function(err, view_check) {
		if (err){
		  res.send(err);
		}else{
			if(view_check.length > 0){
				Object.keys(req.body).forEach(param => {
					user_check[view_check.length - 1][param] = req.body[param]
				})
				
				View.update(view_check[view_check.length - 1], function(err, task) {
					if (err)
					  res.send(err);
					res.json(task);
				});
			}
		}
	});
};