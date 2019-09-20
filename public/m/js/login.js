$(function(){

    //为登录按钮注册点击事件
    $("#register-btn").on('click',function(){
        //获取用户输入
        var username=$('[name="username"]').val();
        var password=$('[name="password"]').val();
        //发送ajax请求
        $.ajax({
            type:'post',
            url:'/user/login',
            data:{
                username:username,
                password:password
            },
            success:function(result){
                //判断是否登录成功
                if(result.success==true){
                    mui.toast('登录成功 正在跳转');
                    setTimeout(function(){
                        location.href='user.html';
                    },2000);
                }else{
                    mui.toast(result.message);
                }
            }

        })

    })

})