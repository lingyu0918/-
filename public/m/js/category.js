$(function () {
    mui('.mui-scroll-wrapper').scroll({
        deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
    });

    //获取一级分类的数据
    $.ajax({
        type: 'get',
        url: '/category/queryTopCategory',
        dataType: 'json',
        success: function (result) {
            // console.log(result);
            //调用模板数据
            var html = template("template", result);
            $(".links").html(html);
            //添加默认第一分类选中样式 要在 数据渲染后 添加样式
            //判断一级分类数据是否渲染成功
            if (result.rows.length) {
                //如果第一分类渲染成功则 才能添加样式
                $(".links a").eq(0).addClass("active");
                //获取第一个分类的id 进行查询渲染二级分类
                var id=result.rows[0].id;
                //根据id值机芯渲染二级分类
                getCategory(id);
            }
        }

    });

    //点击一级分类 获取一级分类的id 进行查询2及分类
    $(".links").on('click', "a", function () {
        //点击时添加选中样式
        $(this).addClass('active').siblings().removeClass("active");
        //点击时获取id值
        var id = $(this).attr('data-id');
        //根据id进行获取
        //调用渲染二级分类的方法
        getCategory(id);
    })

    //渲染二级分类
    function getCategory(id) {
        $.ajax({
            type: 'get',
            url: '/category/querySecondCategory',
            data: {
                id: id
            },
            dataType: 'json',
            success: function (result) {
                console.log(result);
                //调用模板数据
                var html = template("template-sub", result);
                $(".brand-list").html(html);
            }
        })
    }

})

//localStorage.setItem(key,value) lcoalStorage.setItem(key,value); localStorage.setItem(key,value) localStorage.getItem(key)
//localStorage.getItem(key,value);lcoalStorage.getItems(key) localStorage.getItem(key); 清除localStorage.clear();