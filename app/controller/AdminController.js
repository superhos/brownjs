import Controller from '../../core/Controller.js'
import DB from '../../core/DB.js'
import Record from '../../core/Record.js'
class AdminController extends Controller{
	constructor() {
		super();
		this.view = super.view();
	}

	async index(){
		console.log('idnex');
		var result = await DB.findById("user",1,['id','name','age']);
		this.view.assign('title',result[0].name);
		this.view.display('index.ejs');
	}
}

export default AdminController;