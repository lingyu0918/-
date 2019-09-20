
/* 
    获取传入的商品详细的id值

*/


$(function () {
    //定义全局变量 存储数据
    var data = null;
    var size = null;
    var num=1;
    //获取用户传入的id值
    var id = getParamsUrl(location.search, 'id');
    //根据商品的id获取商品的数据
    $.ajax({
        type: 'get',
        url: '/product/queryProductDetail',
        data: {
            id: id
        },
        success: function (result) {
            console.log(result);
            //小于模板数据渲染页面
            var html = template('templateid', result);
            $("#cont").html(html);
            //将数据存储到全局变量中
            data = result;
        }
    });

    //点击时显示 选中状态
    $("#cont").on('click', '.size span', function () {
        //点击时添加样式
        $(this).addClass("active").siblings().removeClass("active");
        //用户选择的尺码存入变量中
        size = $(this).html();
    });

    //定义一个 开始数量
    var i = 1;
    //点击按钮进行增加和减少数量
    $("#cont").on('tap', '#reduce', function () {
        i--
        if (i < 1) {
            i = 1;
        }
        $(this).siblings().val(i);
        num=i;
    })
    $("#cont").on('tap', '#add', function () {
        i++
        if (i > data.num) {
            i = data.num;
        }
        $(this).siblings().val(i);
        //将值存入i中
        num=i;
    })
    
    
    //添加购物车
    //为添加阿牛注册点击事件
    //怕东南用户是否悬择了尺码
    //调用加入购物车接口
    //提示用户购物车添加成功
    $("#addCart").on('tap', function () {
        //判断用户是否选中尺码
        if(!size){
            
            alert('请选择尺码');
        }else{
            //如果用户选择次吗 则调用接口
            $.ajax({
                type:'post',
                url:'/cart/addCart',
                data:{
                    productId:data.id,
                    num: num,
                    size:size
                },
                success:function(result){
                    if(result.error&&result.error==400){
                        mui.toast('请先登录');
                        setTimeout(function(){
                            location.href="login.html";
                        },2000)
                        
                    };
                    //判断是否添加成功
                    if(result.success){
                        //判断是否添加成功
                        //添加一个弹出框
                        mui.confirm('是否前往购物车查看?',function(message){
                            //index=1是确认 0是取消
                            if(message.index==1){
                                //点击确认 跳转页面
                                location.href='cart.html'
                            }else{
                                //点击取消

                            }
                        })
                    }
                }

            })

        }


    })


})




