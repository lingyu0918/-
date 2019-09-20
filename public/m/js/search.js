

$(function(){

    
    //点击搜索按钮 添加点击事件
    //获取 用户输入的内容
    //判断用户输入的内容
    //如果用户输入的内容 为空则停止跳转
    //如果用户输入的内容不为空 则进行跳转 同时将用户输入的值带到跳转页面
    //将用户输入的内容存储到本地存储
    $("#search-Bth").on('click',function(){
        //获取用户输入的数据
        var keyword=$(this).siblings().val();
        //同时判断用户输入的内容
        if(keyword){
            //如果有值则添加到 本地存储 同时天河钻页面 将输入的值带到页面
            keyArr.push(keyword);
            //同时将数组的值存储到本地当中
            localStorage.setItem('keyArr',JSON.stringify(keyArr));
            location.href="search-result.html?keyword="+keyword;
        }else{
            //如果没有值则停止跳转
            return alert('请输入搜索的商品内容');
        }

    })

    //创建一个数组用于存储用户输入的数据
    var keyArr=[];

    //当页面加载的时候判断本地是否有值 如果有值 赋给数组 将数组的数据渲染页面
    if(localStorage.getItem('keyArr')){
        keyArr=JSON.parse(localStorage.getItem('keyArr'));
        //调用模板数据
        var html=template("templateid",{result:keyArr});
        $("#history-Box").html(html);
        // console.log(html);
    }
    //清空购物车
    $("#clear-history").on('click',function(){
        $("#history-Box").html('');
        //同时清除本地数据
        localStorage.removeItem('keyArr');
    })

})