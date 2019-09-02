"use strict";

var mysql = require('../Service/db');

module.exports = class Win {
  
  constructor(data) {
    if(data){
      this.id = data['id'];
      this.created_at = data['created_at'];
      this.move = data['move'];
      this.score = data['score'];
    }else{
      this.id = 0;
      this.created_at = 0;
      this.move = "";
      this.score = "";
    }
    
  }

  set id(id) {
    this._id = id;
  }

  get id() {
    return this._id;
  }

  set created_at(created_at) {
    this._created_at = created_at;
  }

  get created_at() {
    return this._created_at;
  }

  set move(move) {
    this._move = move;
  }

  get move() {
    return this._move;
  }

  set score(score) {
    this._score = score;
  }

  get score() {
    return this._score;
  }

  find(criteria, callback){
    let users = [];
    mysql.start();
    mysql.select(criteria, callback);
  }

  new(win, callback){
    if(!win._move || !win._score){
      callback("You must set move and score to create an win ")
      return
    }
    mysql.start();
    mysql.insert({
      table: "win",
      fields: [
        "move",
        "score"
      ],
      values:[
        [win._move, win.score]
      ]
    }, callback);
  }

  update(win, callback){
    if(!win.id_win){
      callback("You must send the id")
      return
    }
    if(!win.move || !win.score){
      callback("You must set move or score to create an win ")
      return
    }
    mysql.start();
    mysql.update({
      table: "win",
      where: [
        {
          id_win: win.id_win
        }
      ],
      data: [
        {
          "move": win.nickname
        },
        {
          "score": win.score
        }
      ]
    }, callback);
  }
  
}