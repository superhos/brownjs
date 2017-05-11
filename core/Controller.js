import View from './View.js'
class Controller{
	constructor() {
		this.req = null;
		this.res = null;
		this.queryUrl = {};
		//设置view
		this.view = new View();
	}

	//设置request,response和请求参数
	setHttp(req,res,queryUrl){
		this.req = req;
		this.res = res;
		this.queryUrl = queryUrl;
		this.view.setRes(res);
	}

	//获取get请求的参数
	get(query){
		return this.queryUrl[query];
	}

	//获取post请求的参数
	post(query){
		//To Be Continue
	}

	//返回当前controller的view对象
	view(){
		return this.view;
	}
}

export default Controller;