

$(function () {

    //获取用户列表
    getList();
    function getList() {
        $.ajax({
            type: 'get',
            url: '/user/queryUser',
            data: {
                page: 1,
                pageSize: 10
            },
            success: function (result) {
                console.log(result);
                var html = template('templateid', result);
                $("#table").html(html);
            }
        })
    };
    //点击用户的状态操作

    $("#table").on('click', '#status-btn', function () {
        //获取用户的状态 和id值
        var isDelete = $(this).attr("data-isDelete");
        var id = $(this).attr('data-id');
        isDelete = Number(isDelete) ? 0 : 1;
        //进行ajax请求
        $.ajax({
            type: 'post',
            url: '/user/updateUser',
            data: {
                id: id,
                isDelete: isDelete
            },
            success: function (result) {
                if (result.success) {
                    console.log(result);
                    //调用渲染数据方法
                    getList();
                }
            }


        })



    })



})