import ejs from 'ejs'
import fs from 'fs'
class ejsEngine{
    //render方法显示模板
	render(res,page,data){
		var body = ejs.renderFile(__dirname +'/../../../app/view/'+page,data,function(err,result){
			if (!err){
				res.writeHead(200, {
				'Content-Type': 'text/html' });
				res.end(result);
			}else{
				res.end(err.toString());
				console.log(err);
			}
		});
	}
}
export default ejsEngine;