//登录拦截  是同步操作
$.ajax({
	type:'get',
	url:'/employee/checkRootLogin',
	async:false,//将其改为同步操作
	success:function(result){
		//判断是否登录
		if(result.error&&result.error==400){
			// 如果没有登录则跳转到登录页面
			location.href='login.html';
		}
	}



})



$(function(){

	var navLi = $('.navs li')

	navLi.on('click',function(){

		$(this).find('ul').slideToggle();

	});

	$(".login_out_bot").on('click',function(){
		//进行退出操作
		$.ajax({
			type:'get',
			url:'/employee/employeeLogout',
			success:function(result){
				//判断是否退出成功
				if(result.success){	
					//退出成功跳转到登录页面
					location.href='login.html';
				}else{
					alert(result.message)
				}
			}

		})

	});

	





});