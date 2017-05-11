import driver from './dbdriver/Driver.js'
/**
 * DB 直接操作类 跟Record配合使用
 */
class DB{
	/**
	 * 插入数据
	 * @param  {String} table 表名称
	 * @param  {Record} record 操作记录
	 * @return {int} 插入状态
	 */
	static async save(table,record){
		var sql = "INSERT INTO {table} (";
		var result = "(";
		record.foreach(function(i,v){
			sql += i + ',';
			result += "'"+v+"',";
		});
		result = result.substring(0,result.length-1) + ')';
		sql = sql.substring(0,sql.length-1) + ') VALUES ' + result + ';';
		sql = sql.replace(/{table}/g,table);
		var db = driver.getDB();
		try{
			var result = await db.query(sql);
		}catch(err){
			console.log(err);
		}
		return new Promise(function(resolve,reject){
			console.log(result);
			resolve(result[0].insertId);
		});
	}

	/**
	 * 根据ID删除指定记录
	 * @param  {String} table 表名称
	 * @param  {int} id 删除的ID
	 * @return {int} 删除状态
	 */
	static async deleteById(table,id,id_name){
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
		var db = driver.getDB();
		var result = await db.query(sql);
		return new Promise(function(resolve,reject){
			resolve(result[0]);
		});
	}

	/**
	 * 根据ID查找记录
	 * @param  {String} table 操作表名称
	 * @param  {int} id 查找的id
	 * @param  {Array|String} fields 查找的列
	 * @param  {String} id_name id的列名，默认为'id'
	 * @return {Object}	
	 */
	static async findById(table,id,fields,id_name){
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
		var db = driver.getDB();
		var result = await db.query(sql);
		return new Promise(function(resolve,reject){
			resolve(result[0]);
		});
	}

	static update(table,id,record){

	}

	static findByCache(){
		
	}

	/**
	 * Sql 查找
	 * @param  {String} sql
	 * @return {Array<Record>} record集
	 */
	static find(sql){

	}

	/**
	 * 查找表的所有数据
	 * @param  {String} table 表名
	 * @param  {Array<String>} fields 列
	 * @return {Array<Record>} record集
	 */
	static async findAll(table,fields){
		if (typeof fields === "undefined"){
			fields = "*";
		}
		if (typeof fields === "Array"){
			fields = fields.join(',');
		}
		var sql = "SELECT {fields} FROM {table}";
		sql = sql.replace(/{table}/g,table).replace(/{fields}/g,fields);
		var db = driver.getDB();
		var result = await db.query(sql);
		return new Promise(function(resolve,reject){
			resolve(result[0]);
		});
	}
}

export default DB;