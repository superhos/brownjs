import driver from './dbdriver/Driver.js'
require("babel-polyfill");
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
		var db = driver.getDB();
		try{
			var result = await db.save(table,record);
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
		var db = driver.getDB();
		var result = await db.deleteById(table,id,id_name);
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
		var db = driver.getDB();
		var result = await db.findById(table,id,fields,id_name);
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
		var db = driver.getDB();
		var result = await db.findAll(sql);
		return new Promise(function(resolve,reject){
			resolve(result[0]);
		});
	}
}

export default DB;