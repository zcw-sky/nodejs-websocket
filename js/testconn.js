var conn=require('./connection.js');
client=conn.getConnection();
client.connect();
client.query('select * from '+conn.getTableUser(),function(err, results, fields){
	if(err){
		throw err;
	}

	if (results) {
		//console.log(results);
		//将RowDataPacket对象装化成json字符串
		var string=JSON.stringify(results);
		//console.log(string);
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