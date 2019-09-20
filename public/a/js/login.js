//判断其是否登录 如果登录了则进行跳转到user页
//将其请求和跳转为同步操作
$.ajax({
    type: 'get',
    url: '/employee/checkRootLogin',
    async: false,//将其改为同步操作
    success: function (result) {
        //判断是否登录
        if (result.success) {
            location.href = 'user.html';
        }
    }



})



$(function () {

    //给登录按钮注册点击事件
    /* 
        //获取用户输入的用户名和密码
        判断用户输入的是否正确
        如果正确则进行跳转页面
    */
    $("#login-btn").on('click', function () {
        //获取用户输入的内容
        var username = $('[name="username"]').val();
        var password = $('[name="password"]').val();
        //判断叶黄素呼入的是否合法
        if ($.trim(username) == '') {
            alert('用户名不能为空');
            return;
        }
        if ($.trim(password) == '') {
            alert('密码不能为空');
            return;
        }
        //进行ajax请求
        $.ajax({
            type: 'post',
            url: '/employee/employeeLogin',
            data: {
                username: username,
                password: password
            },
            success: function (result) {
                //判断其是否登录成功
                if (result.success) {
                    // 登录成功进行跳转
                    location.href = 'user.html';

                } else {
                    alert(result.message)

                }
            }


        })


    })




})