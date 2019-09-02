"use strict";

var mysql = require('../Service/db');

module.exports = class User {
  
  constructor(data) {
    if(data){
      this.id = data['id'];
      this.total = data['total'];
      this.nickname = data['nickname'];
    }else{
      this.id = 0;
      this.total = 10;
      this.nickname = "";
    }
    
  }

  set id(id) {
    this._id = id;
  }

  get id() {
    return this._id;
  }

  set total(total) {
    this._total = total;
  }

  get total() {
    return this._total;
  }

  set nickname(nickname) {
    this._nickname = nickname;
  }

  get nickname() {
    return this._nickname;
  }

  find(criteria, callback){
    let users = [];
    mysql.start();
    mysql.select(criteria, callback);
  }

  new(user, callback){
    if(!user._nickname || !user._total){
      callback("You must set nickname and total to create an user ")
      return
    }
    mysql.start();
    mysql.insert({
      table: "user",
      fields: [
        "nickname",
        "total"
      ],
      values:[
        [user._nickname, user.total]
      ]
    }, callback);
  }

  update(user, callback){
    if(!user.id_user){
      callback("You must send the id")
      return
    }
    if(!user.nickname || !user.total){
      callback("You must set nickname or total to create an user ")
      return
    }
    mysql.start();
    mysql.update({
      table: "user",
      where: [
        {
          id_user: user.id_user
        }
      ],
      data: [
        {
          "nickname": user.nickname
        },
        {
          "total": user.total
        }
      ]
    }, callback);
  }
  
}