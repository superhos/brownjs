import Controller from '../../core/Controller.js'
import DB from '../../core/DB.js'
import Record from '../../core/Record.js'
class IndexController extends Controller{
	constructor() {
		super();
		this.view = super.view();
	}

	async index(){
		// var cl = super.get('cl');
		// super.view().output("Hello World! " + cl);
		// var user = new Record().set('name','Sevens').set('age',27);
		// user.toString();
		// var result = DB.save("user",user);
		// var result = DB.findAll("user",['name','age']);
		// super.view().output(result);

		var result = await DB.findById("user",1,['id','name','age']);
		this.view.assign('title',result[0].age);
		this.view.display('index.ejs');
	}

	show(){
		this.view.assign('title','Hello World');
		this.view.display('index.ejs');
	}

	about(){
		// this.view.assign('title','I am ABOUT');
		// this.view.display('index.ejs');
		var iamjson = {
			name: 'sevens',
			format: 'json'
		}
		this.view.json(iamjson);
	}

	async save(){
		var name = super.get('name');
		var age = super.get('age');
		var user = new Record().set('name',name).set('age',age);
		var insertId = await DB.save("user",user);
		this.view.assign('title',insertId);
		this.view.display('index.ejs');
	}
}

export default IndexController;