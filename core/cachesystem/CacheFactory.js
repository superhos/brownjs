//缓存
let caches = [];
class CacheFactory{
	static getCache(){
		var cacheType = Brown.getInstance().get('db').driver;
		if (caches[cacheType]){
			return caches[cacheType];
		}
		var cacheTypeClass = require('./caches/'+firstUpperCase(cacheType)+'Cache.js');
		caches[cacheType] =  new cacheTypeClass['default']();
		return caches[cacheType];
	}
}

export default CacheFactory;