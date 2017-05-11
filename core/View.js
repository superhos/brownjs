import Brown from './Brown.js'
import Engine from './view-engine/engine.js';
/**
 *   View 处理
 *
 **/
class View{
	constructor(){
		this.res = null;
		this.engine = Engine.createEngine(Brown.getInstance().get('view engine'));
	}

	setRes(res){
		this.res = res;
	}

	output(str){
		const body = str.toString();
		this.res.writeHead(200, {
			'Content-Type': 'text/html' });
		this.res.write(body);
		this.res.end();
	}

	setHeader(code,data){
		this.res.writeHead(code, data);
	}

	json(obj){
		const body = JSON.stringify(obj);
		this.res.writeHead(200, {
			'Content-Type': 'text/json' });
		this.res.write(body);
		this.res.end();
	}

	display(path){
		this.engine.render(this.res,path,this.data);
	}

	assign(key,val){
		if (typeof this.data === "undefined")this.data = {};
		this.data[key] = val;
	}
}

export default View;