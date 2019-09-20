$(function () {

    //当前页
    var page = 1;
    //没有多少条数据
    var pageSize = 10;
    //共多少页
    var total = 0;

    categorySecond();
    function categorySecond() {
        //渲染页面数据
        $.ajax({
            type: 'get',
            url: '/category/querySecondCategoryPaging',
            data: {
                page: page,
                pageSize: pageSize
            },
            dataType: 'json',
            success: function (result) {
                // console.log(result);
                // 调用模板数据
                var html = template('templateid', result);
                $(".table").html(html);
                //共多少页
                total = Math.ceil(result.total / pageSize);

            }
        });

    }
    //分页操作
    //下一页
    $("#nextBtn").on('click', function () {

        //当前页加1
        page++;
        if (page > total) {
            page = total;
            alert('已经是最后一页了!');
            return;
        }
        categorySecond();
    })
    //上一页
    $("#prevBtn").on('click', function () {

        //当前页加1
        page--;
        if (page < 1) {
            page = 1;
            alert('当前为第一页');
            return;
        }
        categorySecond();
    });


    //获取一级分类
    $.ajax({
        type: 'get',
        url: '/category/queryTopCategoryPaging',
        data: {
            page: 1,
            pageSize: 100,
        },
        success: function (result) {
            console.log(result);
            var html = template('rows', result);
            $("#select").html(html)
        }
    });


    //获取图片的地址
    var brandLogo = "";

    //点击上传按钮 获取其上传图片的路径
    $('#fileupload').fileupload({
        dataType: 'json',
        done: function (e, data) {
            //获取其上传图片的路径
            var url = data.result.picAddr;
            //进行图片预览
            $(".img-thumbnail").attr("src",url);
            brandLogo = url;

        }
    });



    //为添加按钮注册点击事件
    $("#save-btn").on('click', function () {
        //获取用户选择的分类di
        var categoryId = $('[name="categoryId"]').val();
        //获取用户输入的商品mingcheng
        var brandName = $('[name="brandName"]').val();
        //判断用户输入的是否合法
        if ($.trim(brandLogo) == '') {
            alert('请选择商品分类');
            return;
        }
        if ($.trim(categoryId) == '') {
            alert('请输入商品名称');
            return;
        }
        if ($.trim(brandName) == '') {
            alert('请选择上传文件');
            return;
        }
        //进行上传操作
        //给保存按钮注册点击事件
        $.ajax({
            type: 'post',
            url: '/category/addSecondCategory',
            data: {
                brandName: brandName,
                categoryId: categoryId,
                brandLogo: brandLogo,
                hot: 1,
            },
            success: function (result) {
                //判断是否添加成功
                if (result.success) {
                    //关闭模态框
                    $('.modal').modal('hide');
                    //进行渲染页面
                    categorySecond();
                }
            }


        })



    })





})





