import mysql from 'mysql2/promise'
import Brown from '../../Brown.js'
import bluebird from 'bluebird'

class MysqlDriver{
	constructor(){
		this.config = Brown.getInstance().get('db');
	}

	async connect(){
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
	}

	async query(sql,callback){
		if (this.connection == null) await this.connect();
		var result = await this.connection.query(sql);
		return new Promise(function(resolve,reject){
			resolve(result);
		});
	}
}

export default MysqlDriver;