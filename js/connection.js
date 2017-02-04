/*表前缀*/
var prefix='socket';
/**
*创建mysql链接
*/
module.exports.getConnection=function() {
	var mysql=require('mysql');	

	var client=mysql.createConnection({
		host:'127.0.0.1',
		port:'3306',
		user:'nodejs',
		password:'nodejs',
		database:'nodejs',
	});
	return client;
}
/*返回表名*/
module.exports.getTableUser=function(){
	return prefix+'_user';
}