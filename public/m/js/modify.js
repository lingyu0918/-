$(function () {

    $("#modify-btn").on('click', function () {
        //获取用户输入的内容
        var oldPassword = $('[name="oldPassword"]').val();
        var newPassword = $('[name="newPassword"]').val();
        var confirmNewPass = $('[name="confirmNewPass"]').val();
        var vCode = $('[name="vCode"]').val();

        //简单判断用户的输入
        if ($.trim(oldPassword) == '') {
            mui.toast('请输入用户名');
            return
        }
        if ($.trim(newPassword) !== $.trim(confirmNewPass)) {
            mui.toast('确认密码错误');
            return
        }
        //进行修改请求
        $.ajax({
            type: 'post',
            url: '/user/updatePassword',
            data: {
                oldPassword: oldPassword,
                newPassword: newPassword,
                vCode: vCode
            },
            success: function (result) {
                //判断是否登录
                if (result.error && result.error == 400) {
                    mui.toast('请先登录');
                    setTimeout(function () {
                        location.href = 'login.html';
                    }, 2000);
                };
                if (result.error && result.error > 400) {
                    mui.toast(result.message);
                    return;
                }
                //判断用户是否修改成功
                if (result.success) {
                    mui.toast('修改成功，正在跳转...');
                    //跳转成功同时 退出登录
                    $.ajax({
                        type: 'get',
                        url: '/user/logout',
                        success: function (result) {
                            if (result.success) {
                                mui.toast('修改成功 正在跳转...');
                                setTimeout(function () {
                                    location.href = 'login.html';
                                }, 2000)
                            }
                        }

                    });
                };


            }

        })

    });

    //获取修改面的认证码
    //为获取验证码注册点击事件
    $("#getCode").on('click', function () {
        $.ajax({
            type: 'get',
            url: '/user/vCodeForUpdatePassword',
            success: function (result) {
                alert(result.vCode);
            }

        })
    })



})