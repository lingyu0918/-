$(function () {

    /* 
        为注册按钮添加点击事件
        获取用户输入的内容
        简单判断用户输入的内容
        如果用户输入正确则键该内容放到接口
    */
    $("#register-btn").on("click", function () {
        var username = $('[name="username"]').val();
        var mobile = $('[name="mobile"]').val();
        var password = $('[name="password"]').val();
        var towpwd = $('[name="towpwd"]').val();
        var vCode = $('[name="vCode"]').val();
        //判断用户输入的是否合法

        if (username == '') {
            mui.toast('请输入用户名');
            return
        }
        if (mobile.length != 11) {
            mui.toast('手机号错误');
            return
        }
        if (password == '') {
            mui.toast('请输入密码');
            return
        }
        if (password != towpwd) {
            mui.toast('确认密码错误');
            return
        }
        if (vCode.length != 6) {
            mui.toast('认证码错误');
            return
        }
        //注册操作
        $.ajax({
            type: 'post',
            url: '/user/register',
            data: {
                username: username,
                password: password,
                mobile: mobile,
                vCode: vCode
            },
            dataType: 'json',
            success: function (result) {
                console.log(result);
                //判断是否注册成功
                if (result.success==true) {
                    mui.toast('注册成功');
                    setTimeout(function () {
                        location.href = 'login.html';
                    }, 2000);
                }else{
                    mui.toast(result.message);
                    return;
                }
            }


        })


    });


    /* 
        点击获取认证码按钮注册点击事件
    */

    $("#getCode").on('click', function () {
        $.ajax({
            type: 'get',
            url: '/user/vCode',
            success: function (result) {
                alert(result.vCode);
            }

        })

    })




})
