var mysql=require('mysql');
var prefix='socket';
//var database='nodejs';
var table_user=prefix+'_user';

var client=mysql.createConnection({
	host:'127.0.0.1',
	port:'3306',
	user:'nodejs',
	password:'nodejs',
	database:'nodejs',
});


client.connect();
//client.query('use '+database);
client.query('select * from '+table_user,function(err, results, fields){
	if(err){
		throw err;
	}
	console.log(fields);
	if (results) {
		//console.log(results);
		//将RowDataPacket对象装化成json字符串
		var string=JSON.stringify(results);
		console.log(string);
		//将json字符串转化成json数组
		var json=JSON.parse(string);
		console.log(json);
		console.log(json.length);
		//遍历json数组
		for (var i =0; i <json.length; i++) {
			console.log('%d\t%s\t%s',json[i].id,json[i].username,json[i].password);
		};
	}
});

//mysql_add();
/*
* 添加数据
*/
function mysql_add(){
	var insersql='insert into '+table_user+'(`username`,`password`,`create_time`,`online`) values(?,?,UNIX_TIMESTAMP(now()),?)';
	var param=['nodejs2','nodejs_password','2'];
	client.query(insersql,param,function(err,results){
		if(err){
			throw err;
		}

		if(results){
			/**
			成功显示
			OkPacket {
			  fieldCount: 0,
			  affectedRows: 1,
			  insertId: 8,
			  serverStatus: 2,
			  warningCount: 0,
			  message: '',
			  protocol41: true,
			  changedRows: 0 }
			*/
			console.log(results);
		}
	});
}

//mysql_update();
/**
* 更新数据
*/
function mysql_update(){
	var updatesql='update '+table_user+' set online=?,create_time=UNIX_TIMESTAMP(now()) where id=?';
	var param=['2','1'];
	client.query(updatesql,param,function(err,results){
		if(err){
			throw err;
		}

		if(results){
			/**
			修改成功显示
			OkPacket {
			  fieldCount: 0,
			  affectedRows: 1,
			  insertId: 0,
			  serverStatus: 2,
			  warningCount: 0,
			  message: '(Rows matched: 1  Changed: 1  Warnings: 0',
			  protocol41: true,
			  changedRows: 1 }

			*/
			console.log(results);
			console.log(JSON.parse(JSON.stringify(results)));
		}
	});
}

//mysql_delete();
/**
* 删除数据
*/
function mysql_delete(){
	var deletesql='delete from '+table_user+' where id=?';
	var param=['2'];
	client.query(deletesql,param,function(err,results){
		if(err){
			throw err;
		}

		if(results){
			/**
			删除成功显示
			OkPacket {
			  fieldCount: 0,
			  affectedRows: 1,
			  insertId: 0,
			  serverStatus: 2,
			  warningCount: 0,
			  message: '',
			  protocol41: true,
			  changedRows: 0 }
			*/
			console.log(results);
		}
	});
}