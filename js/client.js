/*
 *初始化方法
 */
function init(){
    return io.connect("ws://localhost:3002");
}
/*创建socket连接*/
var socket=init();
/*
 *登录方法
 */
function login() {
    var uid=document.getElementById('number').value;
    var nickname=document.getElementById('nickname').value;
    if(uid&&nickname){
        //获取参数
        var data={'uid':uid,'nickname':nickname};
        console.log(data);
        //发送登录信息
        socket.uid=uid;
        socket.nickname=nickname;
        socket.emit('login',data);
        //监听登录状态
        socket.on('login',function(datas){
            //返回登录信息
            console.log(datas);
            if(datas.msg=='success'){
                top.location='./main.html?uid='+escape(socket.uid)+'&nickname='+escape(socket.nickname);
            }else{
                alert('登录失败');
            }
        });
    }else{
        alert('请输入id和昵称');
    }
}

/*
 *处理消息的方法
 */

function message(){
    var uid=getQueryString('uid');
    var content=document.getElementById('message').value;
    var nickname=getQueryString('nickname');
    var data={'uid':uid,'nickname':nickname,'content':content};
    socket.uid=uid;
    socket.nickname=nickname;

    console.log('uid:'+uid);
    //发送登录信息
    socket.emit('message',data);

}
//重复建立连接和监听会导致重复收到消息，所以监听收消息时间需要写在外面

//监听登录状态
socket.on('message',function(datas){
    //返回登录信息
    console.log(datas);
    var showHtml=html='';
    var userList=datas.userid;
    if(datas.status=='1'){
        //登录

        var counts=0;
        for(key in userList){
            counts++;
            console.log(key+'---->'+userList[key]);
            showHtml+=userList[key]+'、';
        }
        if(datas.socketid!=socket.uid){
            //说明不是当前用户登录
            html=datas.userid[datas.socketid]+'、进入聊天室';
        }else{
            //说明是刚刚登录的，统计所有用户
            html=showHtml+'共'+counts+'人在线';
        }

        var dom=document.createElement('p');
        dom.className='mt';
        //dom.innerHTML=datas.userid[datas.socketid]+'进入聊天室';
        dom.innerHTML=html;
        document.getElementById('showmsg').appendChild(dom);
        console.log(html);
    }else{
        //发送消息
        console.log('send message ......');
        var dom=document.createElement('p');

        if(datas.socketid!=socket.uid){
            //说明不是当前用户登录
            dom.className='lefts';
        }else{
            //说明是刚刚登录的，统计所有用户
            dom.className='rights';
        }
        html='<span class="up">'+datas.userid[datas.socketid]+'</span><span class="down">'+datas.msg+'</span>';
        dom.innerHTML=html;
        document.getElementById('showmsg').appendChild(dom);

    }

});
/*
 *获取url参数
 */
function getQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]); return null;
}



