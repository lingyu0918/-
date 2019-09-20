
//定义全局变量存储渲染的数据
var data = null;
$(function () {

    //渲染收货地址的数据
    getlist();
    function getlist() {
        $.ajax({
            type: 'get',
            url: '/address/queryAddress',
            success: function (result) {
                //调用模板数据
                var html = template('templateid', { items: result });
                $("#address").html(html);
                //将数据存储到全局变量
                data = result;
            }
        });
    }




    //执行删除操作
    $("#address").on('click', '.delete-btn', function () {
        var id = $(this).attr('data-id');
        var li = $(this).parents('li');
        //点击删除按给出提示框
        mui.confirm('确认要删除吗?', function (message) {
            //判断其点击的是确认还是删除
            if (message.index == 1) {
                //确认
                $.ajax({
                    type: 'post',
                    url: '/address/deleteAddress',
                    data: {
                        id: id
                    },
                    success: function (result) {
                        if (result.success) {
                            mui.toast('删除成功');
                            getlist();
                        }
                    }
                })
            } else {
                //取消 点击取消的时候 滑动消失
                mui.swipeoutClose(li[0]);
            }
        })
    })

    //进行修改操作
    $("#address").on('click', '.edit-btn', function () {
        //获取其存储的id值
        var id = $(this).attr('data-id');
        //获取数组数据 进行遍历获取对应的id值的数据
        data.forEach(function (value) {
            if (value.id == id) {
                //则将其数据存入到本地
                localStorage.setItem('adressEdit', JSON.stringify(value));
                //每次点击就替换之前的内容
                return;
            }
        })
        //否则return null
        location.href = "addAddress.html?id="+id;
    });




})