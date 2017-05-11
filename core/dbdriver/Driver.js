import {firstUpperCase} from '../Common.js'
import Brown from '../Brown.js'
//引擎缓存
let drivers = [];

class Driver{
	static getDB(){
		var dbdriver = Brown.getInstance().get('db').driver;
		if (drivers[dbdriver]){
			return drivers[dbdriver];
		}
		var dbdriverClass = require('./drivers/'+firstUpperCase(dbdriver)+'Driver.js');
		drivers[dbdriver] =  new dbdriverClass['default']();
		return drivers[dbdriver];
	}
}

export default Driver;