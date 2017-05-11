import url from 'url'
import fs from 'fs'
import qs from 'querystring';
import {firstUpperCase} from './Common.js'
import Exception from './Exception.js'

//controller缓存
let Controllers = [];

exports.handle = function(req,res){
	req.requrl = url.parse(req.url,true);
	//请求参数
	var queryUrl = qs.parse(url.parse(req.url).query);
	//请求路径
	var path = req.requrl.pathname;
	//是否是静态文件
	if (/.(css)$/.test(path)){
		res.writeHead(200,{
			'Content-Type': 'text/css'
		});
		fs.readFile(__dirname+path,'utf8',function(err,data){
			if (err) throw err;
			//输出静态文件
			res.write(data,'utf8');
			res.end();
		})
	}else if (/.(ico)$/.test(path)){

	}else{
		//读取请求的controller、action
		var controller = queryUrl['cl'];
		var action = queryUrl['ac'];

		var controllerClass;
		var controllerObj;

		//如果没有指定controller、action 默认为index
		if (typeof controller === "undefined"){
			controller = 'index';
		}

		if (typeof action === "undefined"){
			action = 'index';
		}

		try{
			//是否有缓存
			// console.log("controller:" + controller + "  action: " + action);
			if (Controllers[firstUpperCase(controller)]){
				controllerObj = Controllers[firstUpperCase(controller)];
			}else{
				//没有缓存读取controller
				controllerClass = require('../app/controller/'+firstUpperCase(controller)+'Controller.js');
				controllerObj = new controllerClass['default']();
				Controllers[firstUpperCase(controller)] = controllerObj;
			}
			//设置request,response和请求参数
			controllerObj.setHttp(req,res,queryUrl);
			//判断action是否存在
			if (!controllerObj[action]){
				// console.log('不存在');
				new Exception(controllerObj.view).show_404();
				return;
			}
			//执行action方法
			controllerObj[action]();
		}catch(err){
			console.log(err);
		}
	}
}