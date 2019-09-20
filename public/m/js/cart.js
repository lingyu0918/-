//定义一个全局变量存储d当前页
var page = 1;
//定义全局变量存储数据的值
var html = null;
//创建一个that全局变量 存储this
var that = null;
$(function () {
    

    //进行上拉加载
    mui.init({
        pullRefresh: {
            container: '#refreshContainer',//待刷新区域标识，querySelector能定位的css选择器均可，比如：id、.class等
            up: {
                height: 50,//可选.默认50.触发上拉加载拖动距离
                auto: true,//可选,默认false.自动上拉加载一次
                contentrefresh: "正在加载...",//可选，正在加载状态时，上拉加载控件上显示的标题内容
                contentnomore: '没有更多数据了',//可选，请求完毕若没有更多数据时显示的提醒内容；
                callback: getData //必选，刷新函数，根据具体业务来编写，比如通过ajax从服务器获取新数据；
            }
        }
    });

    //点击删除操作
    $("#cartlist").on('tap', '#cart-delete', function () {
        var li=$(this).parents('li');
    
        //获取i删除的id值
        var id = $(this).attr("data-id");
        //根据id进行ajax请求
        $.ajax({
            type: 'get',
            url: '/cart/deleteCart',
            data: {
                id: id
            },
            success: function (result) {
                if (result.success) {
                    //提示框判断是否删除
                    mui.confirm("确认要删除吗?", function (items) {
                        if (items.index == 1) {
                            //确认
                            //如果删除成功则进行重新加载页面
                            mui.toast('删除成功');
                            getData();
                        } else {
                            //删除
                            // mui.swipeoutClose(li);//关闭滑动
                        }
                    })

                    
                }
            }


        })

    })




});

function getData() {
    //进行调用渲染方法
    // /获取购物和数据渲染页面
    if (!that) {
        that = this;
    }
    $.ajax({
        type: 'get',
        url: '/cart/queryCartPaging',
        data: {
            page: page++,
            pageSize: 3,
        },
        success: function (result) {
            console.log(result.data);
            if (result.data.length < 3) {
                that.endPullupToRefresh(true);
            }
            //调用模板数据
            html += template('templateid', result)
            $("#cartlist").html(html);
            that.endPullupToRefresh(false);
        }

    });

}

