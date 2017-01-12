var app=require('express')();
var http=require('http').Server(app);
var io=require('socket.io')(http);
var fs=require('fs');
//设置登录用户数组
var userid={};
var counts=0;
app.get('/',function(req,res){
});

//设置与客户端的链接
io.on('connection',function(socket){
	console.log('a user connection...');
	//登录
	socket.on('login',function(obj){
		console.log(obj);
		//var data=;
		io.emit('login',{userid:userid,status:1,msg:'success'});
	});
	//监听用户退出
	socket.on('disconnect',function(){
		if(userid.hasOwnProperty(socket.uid)){
			delete userid[socket.uid];
			counts--;
			console.log(socket.uid+'退出');
			console.log(userid);
		}
	});
	//发送消息
	socket.on('message',function(obj){
		socket.uid=obj.uid;
		var _status=1;
		var content='';
		console.log('------');
		console.log(userid);
		console.log('------');
		//推送给所有在线用户，有新用户上线
		//status:1登录2消息
		if(obj.content!=''){
			//消息内容
			_status=2;
			content=obj.content;
		}else{
			//用户登录
			console.log(obj);
			socket.uid=obj.uid;
			if(!userid.hasOwnProperty(obj.uid)){
				//将新用户添加到数组
				userid[obj.uid]=obj.nickname;
				counts++;
			}
		}
		io.emit('message',{userid:userid,status:_status,msg:content,socketid:obj.uid});
	});
});

//创建服务器
http.listen(3002,function(req,res) {
	// body...
	console.log('listen 3002 success...');
});