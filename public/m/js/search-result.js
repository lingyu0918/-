//获取用户输入的商品名称
var keyword = getParamsUrl(location.search, 'keyword');
//设置当前页
page = 1;
//设置存储模板数据的变量
var html = "";
//设置排序值 默认值为1
var price = 1;
//按销量进行排序
var num = 1;

//定义全局变连存储this
var that = null;

$(function () {

    //上拉加载
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

    //点击价格按钮时 进行排序

    /* 
        //通过获取 排序值进行商品排序
        //为价格按钮注册轻敲事件 
        //获取点击的排序值 同时 传入接口中
        //清空之前的数据 获取当前第一页页码
        //同时 重置上拉加载 
        //调用回调函数渲染页面
    
    */
    $("#price-Sort").on('tap', function () {
        price = price == 1 ? 2 : 1;
        //清空之前的数据
        html = "";
        //同时当前页为第一个
        page = 1;
        //设置 重置上拉加载 
        mui('#refreshContainer').pullRefresh().refresh(true);
        //渲染页面调用会
        getData();
    });
    //按照 销量库存进行排序

    $("#num-Sort").on('tap', function () {
        num = num == 1 ? 2 : 1;
        //清空之前的数据
        html = "";
        //同时当前页为第一个
        page = 1;
        //设置 重置上拉加载 
        mui('#refreshContainer').pullRefresh().refresh(true);
        //渲染页面调用会
        getData();

    });



})


function getParamsUrl(url, name) {
    url = url.substr(1);
    //进行按&符号进行分割
    var arr = url.split("&");
    //遍历数组
    for (var i = 0; i < arr.length; i++) {
        var items = arr[i].split('=');
        //判断是否等于传递的参数
        if (items[0] == name) {
            return items[1];
        }
    }
}

//上拉加载时触发 当页面加载完成时 会默认触发一次
function getData() {
    //当that为null时 则为this
    if (!that) {
        that = this;
    }
    console.log(that);
    //上拉加载时触发渲染页面的ajax请求
    //发送ajax请求渲染页面
    $.ajax({
        type: 'get',
        url: '/product/queryProduct',
        data: {
            proName: keyword,
            page: page++,//每次上拉时就调用该方法
            pageSize: 3,
            price: price,
            num: 1,
        },
        success: function (result) {
            //判断上滑的页是否有值
            if (result.data.length) {
                //如果有值则调用该上拉加载方法完成方法
                //调用模板引擎 渲染数据
                html += template('templateid', result);
                $("#search-list").html(html);

                //渲染页面完成时则表示加载完成 调用加载完成的方法 同时表示还有数据
                that.endPullupToRefresh(false);
                //当前ajax请求当中的this是wendow
            } else {
                //否则则调用加载完成方法 则不会调用该上拉加载
                that.endPullupToRefresh(true);
            }


        }

    });


}



