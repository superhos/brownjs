//引擎缓存
let Engines = [];

class Engine{
	static createEngine(engineType){
		if (Engines[engineType]){
			return Engines[engineType];
		}
		var engineClass = require('./engine/'+engineType+'Engine.js');
		Engines[engineType] =  new engineClass['default']();
		return Engines[engineType];
	}
}

export default Engine;