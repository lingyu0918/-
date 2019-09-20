//当页面加载的时候判断是修改还是新增
var id = getParamsUrl(location.search, 'id');

$(function () {


    //判断是是否存在id值 如果存在 则进行修改操作 如果 没有则进行添加操作
    if (id) {
        //如果是修改则 渲染页面数据
        //判断本地是否存在数据
        if (localStorage.getItem('adressEdit')) {
            var result = JSON.parse(localStorage.getItem('adressEdit'));
            //将其获取的数据渲染到页面
            //调用模板数据
            // console.log(result);
            var html = template('templateid', result);
            $(".mui-input-group").html(html);
        }

    } else {
        //新增 页面
        var html = template('templateid', {});
        $(".mui-input-group").html(html);
    }



    //初始化三级联动
    //创建一个picker对象
    var picker = new mui.PopPicker({ layer: 3 }); //layer:3表示3列
    //个其对象赋值
    picker.setData(cityData);
    //当点击时显示出来
    $("#selectCty").on('tap', function () {//回调函数获取选择的数据
        picker.show(function (message) {
            $("#selectCty").val(message[0].text + message[1].text + message[2].text);
        })
    })


    $("#address-btn").on('click', function () {

        //获取用户输入的数据
        var recipients = $('[name="recipients"]').val();
        var postcode = $('[name="postcode"]').val();
        var address = $('[name="address"]').val();
        var addressDetail = $('[name="addressDetail"]').val();
        //机芯判断用户输入
        if ($.trim(recipients) == '') {
            mui.toast('请输入收货人');
            return
        }
        if ($.trim(postcode) == '') {
            mui.toast('请输入邮编');
            return
        }
        if ($.trim(address) == '') {
            mui.toast('请输入省市区');
            return
        }
        if ($.trim(addressDetail) == '') {
            mui.toast('请输入详细地址');
            return
        }

        //创建公共的参数
        var data = {
            address: address,
            addressDetail: addressDetail,
            recipients: recipients,
            postcode: postcode
        };

        // 判断当点击按钮的时候是新增还是修改操作 根据id
        if (id) {
            //新增
            var url = "/address/updateAddress";
            data.id=id;
        } else {
            //修改
            var url = '/address/addAddress';
        }

        //ajax请求

        $.ajax({
            type: 'post',
            url: url,
            // data: {
            //     address: address,
            //     addressDetail: addressDetail,
            //     recipients: recipients,
            //     postcode: postcode
            // },
            data: data,
            success: function (result) {
                //判断是否添加成功
                if (result.success) {
                    $(this).attr("disabled", false);
                    if(id){
                        mui.toast('修改成功正在跳转...');
                    }else{
                        mui.toast('添加成功正在跳转...');
                    }
                    
                    setTimeout(function () {
                        location.href = "adress.html";
                    }, 2000)
                }
                //判断是否登录
                if (result.error && result.error == 400) {
                    //则跳转到登录页面
                    mui.toast('请先登录');
                    setTimeout(function () {

                        location.href = "login.html";
                    }, 2000)
                }
            },
            complete: function () {
                $("#address-btn").attr("disabled", true);
            }
        })
    });










})