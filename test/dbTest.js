var poly = require('babel-polyfill');
var expect = require('chai').expect;
var should = require('chai').should();
// var DB = require('../core/DB.js');
import DB from '../core/DB.js';
import Record from '../core/Record.js';

describe('DB.js Testing', function() {
  //findById
  it('#findById()', function(done) {
  	DB.findById("user",1,['id','name','age']).then(function(result){
  		expect(result.name).to.be.equal('sevens');
  		done();
  	}).catch(function(err){
  		console.log(err);
  	});
  });

  it('#save()', function(done) {
  	var name = Date.parse(new Date())+"";
  	var age = 27;
  	var user = new Record().set('name',name).set('age',age);
	DB.save("user",user).then(function(insertId){
		if (typeof insertId !== 'undefined'){
			DB.findById("user",insertId,['id','name','age']).then(function(result){
		  		expect(result.name).to.be.equal(name);
		  		done();
		  	}).catch(function(err){
				console.log(err);
			});
		}
	}).catch(function(err){
		console.log(err);
	});
  });

  it('#deleteById()', function(done) {
  	var name = Date.parse(new Date());
  	var age = 27;
  	var user = new Record().set('name',name).set('age',age);
	DB.save("user",user).then(function(insertId){
		DB.deleteById("user",insertId).then(function(result){
			DB.findById("user",insertId,['id','name','age']).then(function(result){
		  		should.not.exist(result);
		  		done();
		  	}).catch(function(err){
				console.log(err);
			});
	  	}).catch(function(err){
			console.log(err);
		});
	}).catch(function(err){
		console.log(err);
	});
  })
});