$(function () {

    //事件委托A元素的跳转  
    $("body").on('tap', 'a', function () {
        mui.openWindow({
            url: $(this).attr('href'),//点击时获取当前跳转的链接
        })
    })


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
    return null;
}