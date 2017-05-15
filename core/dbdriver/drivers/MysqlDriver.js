import mysql from 'mysql2/promise'
import Brown from '../../Brown.js'
import bluebird from 'bluebird'

class MysqlDriver{
	constructor(){
		this.config = Brown.getInstance().get('db');
	}

	async connect(){
		try{
			//pool
			if (this.config.pool == true){
				this.connection  = await mysql.createPool({
				  connectionLimit : this.config.connectionLimit?this.config.connectionLimit:10,
				  host            : this.config.host,
				  user            : this.config.user,
				  password        : this.config.password,
				  database        : this.config.db_name,
				  Promise : bluebird
				});
			}else{
				this.connection =  await mysql.createConnection({
				  host     : this.config.host,
				  user     : this.config.user,
				  password : this.config.password,
				  database : this.config.db_name,
				  Promise : bluebird
				});
			}
		}catch(err){
			console.log(err);
		}
	}

	async query(sql,callback){
		if (this.connection == null) await this.connect();
		var result = await this.connection.query(sql);
		return new Promise(function(resolve,reject){
			resolve(result);
		});
	}

	async findById(table,id,fields,id_name){
		if (typeof fields === "undefined"){
			fields = "*";
		}
		if (typeof fields === "Array"){
			fields = fields.join(',');
		}
		if (typeof id_name === "undefined"){
			id_name = 'id';
		}
		var sql = "SELECT {fields} FROM {table} WHERE {id_name} = {id}";
		sql = sql.replace(/{id_name}/g,id_name).replace(/{id}/g,id).replace(/{table}/g,table).replace(/{fields}/g,fields);
		var result = await this.query(sql);
		return new Promise(function(resolve,reject){
			resolve(result[0]);
		});
	}

	async findAll(table,fields){
		if (typeof fields === "undefined"){
			fields = "*";
		}
		if (typeof fields === "Array"){
			fields = fields.join(',');
		}
		var sql = "SELECT {fields} FROM {table}";
		sql = sql.replace(/{table}/g,table).replace(/{fields}/g,fields);
		var result = await this.query(sql);
		return new Promise(function(resolve,reject){
			resolve(result[0]);
		});
	}

	async deleteById(table,id,id_name){
		if (typeof fields === "table"){
			throw new Error('Table cannot be null');
		}
		if (typeof fields === "id"){
			throw new Error('id cannot be null');
		}
		if (typeof id_name === "undefined"){
			id_name = 'id';
		}
		var sql = "DELETE FROM {table} WHERE {id_name} = {id}";
		sql = sql.replace(/{id_name}/g,id_name).replace(/{id}/g,id).replace(/{table}/g,table);
		var result = await this.query(sql);
		return new Promise(function(resolve,reject){
			resolve(result[0]);
		});
	}

	async save(table,record){
		var sql = "INSERT INTO {table} (";
		sql = sql.replace(/{table}/g,table);
		var result = "(";
		record.foreach(function(i,v){
			sql += i + ',';
			result += "'"+v+"',";
		});
		result = result.substring(0,result.length-1) + ')';
		sql = sql.substring(0,sql.length-1) + ') VALUES ' + result + ';';
		try{
			var result = await this.query(sql);
		}catch(err){
			console.log(err);
		}
		return new Promise(function(resolve,reject){
			// console.log(result);
			resolve(result[0].insertId);
		});
	}
}

export default MysqlDriver;