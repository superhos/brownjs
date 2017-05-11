class Record{

	constructor(){
		this.columns = {};
		return this;
	}

	set(key,val){
		//方面插入数据库
		this.columns[key] = val;
		return this;
	}	

	get(key){
		return this.columns[key];
	}

	foreach(func){
		for(var i in this.columns){
			func(i,this.columns[i]);
		}
	}

	toString(){
		console.log(this.columns);
	}

}
export default Record;