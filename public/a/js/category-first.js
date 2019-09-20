


$(function () {
    var page = 1;
    var pageSize = 10;
    //总页数
    var total=0;

    getCategory();
    function getCategory() {
        $.ajax({
            type: 'get',
            url: '/category/queryTopCategoryPaging',
            data: {
                page: page,
                pageSize: pageSize
            },
            success: function (result) {
                console.log(result);
                var html = template('templateid', result);
                $(".table").html(html);
                //获取总页数
                total=Math.ceil(result.total/pageSize);
            }
        });
    }




    //进行添加操作
    //点击保存按钮获取用户输入的内容 进行ajax请求渲染页面
    $("#save-btn").on('click', function () {
        
        //获取用户输入的分类名
        var categoryName = $.trim($('[name="categoryName"]').val());
        //判断用户输入的内容是否为空
        if (categoryName == '') {
            alert('内容不能为空');
            return;
        }
        //同时进行ajax请求
        $.ajax({
            type: 'post',
            url: '/category/addTopCategory',
            data: {
                categoryName: categoryName
            },
            success: function (result) {
                //判断是否添加成功
                if (result.success) {
                    getCategory();
                }elseP
                alert(result.message);
            }

        })


    });

    //下一页操作
    $("#next").on('click',function(){
        //当前页加1
        page++;
        //判断当前页是否大于最后一页
        if(page>total){
            page=total;
            alert('已经是最后一页了')
            return;
        }    
        getCategory();
    });
    //上一页操作
    $("#prev").on('click',function(){
        //当前页加1
        page--;
        //判断当前页是否小于第一页
        if(page<1){
            page=1;
            alert('当前为第一页')
            return;
        }    
        getCategory();
    });


})