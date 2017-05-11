import http from 'http'
import router from './Router.js';
import fs from 'fs'

let instance = null;

class Brown{

	constructor(){
		if (!instance){
			instance = this;
		}

		//读取配置
		var config = require(__dirname+'/../app/config/config.js');
		this.config = config?config['default']:{};

		return instance;
	}
	
	static getInstance(){
		if (!instance){
			instance = new Brown();
		}

		return instance;
	}

	set(key,val){
		this.config[key] = val;
	}

	get(key){
		return this.config[key];
	}

	listen(port,ip){
		try{
			var server = http.createServer(function(req,res){
				router.handle(req,res);
			});
			server.listen(port,ip);
			console.log('Server Start Successfully');
		}catch(err){
			console.log(err);
		}
	}
}

export default Brown;