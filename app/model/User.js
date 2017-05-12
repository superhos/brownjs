
/**
 * User表
 */
class User extends Model{
	constructor(){
		this.tableName = 'user'; //如不修改默认为类名
	}

	//验证
	verify(req){
		
	}
}

export default User;