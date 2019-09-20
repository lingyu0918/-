$(function () {

    getProduct();
    function getProduct() {
        //渲染产品列表
        $.ajax({
            type: 'get',
            url: '/product/queryProductDetailList',
            data: {
                page: 1,
                pageSize: 10,
            },
            success: function (result) {
                // console.log(result);
                var html = template('templateid', result);
                $(".table").html(html);
            }
        });
    }



    //获取二级分类

    $.ajax({
        type: 'get',
        url: '/category/querySecondCategoryPaging',
        data: {
            page: 1,
            pageSize: 100
        },
        success: function (result) {
            console.log(result);
            var html = template('templatecat', result);
            $(".form-control").html(html);
        }
    });

    //创建数组记性存储上传图片的信息
    var imgArr = [];
    //获取上传图片的路径
    $('#fileUpload').fileupload({
        dataType: 'json',
        done: function (e, data) {
            imgArr.push(data.result);
            console.log(imgArr);
        }
    });

    //进行添加操作 为保存按钮添加点击事件
    $("#addProduct").on('click', function () {
        var proName = $('[name="proName"]').val();
        var proDesc = $('[name="proDesc"]').val();
        var num = $('[name="num"]').val();
        var size = $('[name="size"]').val();
        var oldPrice = $('[name="oldPrice"]').val();
        var price = $('[name="price"]').val();
        var brandId = $('[name="brandId"]').val();
        //判断是否为空
        if ($.trim(proName) == '') {
            alert('请输入产品名');
            return;
        }
        if ($.trim(proDesc) == '') {
            alert('请输入产品描述');
            return;
        }
        if ($.trim(num) == '') {
            alert('请输入产品数量');
            return;
        }
        if ($.trim(size) == '') {
            alert('请输入产品尺码');
            return;
        }
        if ($.trim(oldPrice) == '') {
            alert('请输入商品原价');
            return;
        }
        if ($.trim(price) == '') {
            alert('请输入商品折扣价');
            return;
        }
        if (!Number(brandId)) {
            alert('请选择品牌');
            return;
        }

        //进行ajax请求
        $.ajax({
            type: 'post',
            url: '/product/addProduct',
            data: {
                proName: proName,
                oldPrice:oldPrice,
                price:price,
                proDesc:proDesc,
                size:size,
                statu:1,
                num:num,
                brandId:imgArr
            },
            success:function(result){
                //判断是否添加成功
                if(result.success){
                    $('module').modal('hide');
                    //添加成功进行渲染页面
                    getProduct();

                }
            }


        })





    })






})