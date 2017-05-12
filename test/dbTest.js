var poly = require('babel-polyfill');
var expect = require('chai').expect;
var should = require('chai').should();
// var DB = require('../core/DB.js');
import DB from '../core/DB.js';
import Record from '../core/Record.js';

describe('DB连接测试', function() {
  //findById
  it('Test findById', function() {
  	DB.findById("user",1,['id','name','age']).then(function(result){
  		expect(result.name).to.be.equal('sevens');
  	});
  });

  it('Test Save function', function() {
  	var name = Date.parse(new Date());
  	var age = 27;
  	var user = new Record().set('name',name).set('age',age);
	DB.save("user",user).then(function(insertId){
		console.log(insertId);
		if (typeof insertId !== 'undefined'){
			DB.findById("user",insertId,['id','name','age']).then(function(result){
				console.log(result.name);
				console.log(result.id);
		  		// expect(result.name).to.be.equal(name+'1');
		  	});
		}
	});
  });

  //findById
 //  it('Test DeleteById', function() {
 //  	var name = Date.parse(new Date());
 //  	var age = 27;
 //  	var user = new Record().set('name',name).set('age',age);
	// DB.save("user",user).then(function(insertId){
	// 	should.exist(insertId);
	// 	if (typeof insertId !== 'undefined'){
	// 		DB.findById("user",insertId,['id','name','age']).then(function(result){
	// 	  		expect(result.name).to.be.equal(name);
	// 	  	});
	// 	}
	// });
 //  });
});