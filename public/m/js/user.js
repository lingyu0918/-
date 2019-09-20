

//定义全局变量存储 登录后的数据
var data;

//获取用户的个人信息 同时判断其是否登录
$.ajax({
    type:'get',
    url:"/user/queryUserMessage",
    //改为同步加载
    async:false,
    success:function(result){
        //判断是否登录
        console.log(result);
        if(result.error&&result.error==400){
            //则表示没有登录
            location.href='login.html';
        }else{
            //如果登录 则将数据存入到全局变量中
            data=result;
        }
    }
})
/* 
    退出操作  为按钮注册点击事件
    //如果退出成功则跳转到其等路页面

*/
$(function () {
    $("#logout").on('click', function () {
        //ajax请求
        $.ajax({
            type: 'get',
            url: '/user/logout',
            success: function (result) {
                if (result.success) {
                    mui.toast('退出成功 正在跳转...');
                    setTimeout(function () {
                        location.href = 'login.html';
                    }, 2000)
                }
            }

        });
    });

    //调用模板数据渲染页面
    var html=template("templateid",data);
    // console.log(html);
    $("#user").html(html);

    







})
