$(function(){
	$(window).scroll(()=>{
		//通过浏览器卷曲的高度来决定
		if($(window).scrollTop()>=300){
			//让回到顶部按钮显示
			$('.goTop').fadeIn()
		}else{
			//让回到顶部按钮隐藏
			$('.goTop').fadeOut()
		}
	});

	//2 这个按钮一点击,让浏览器滚动到顶部
	$('.goTop').click(()=>{
			$('html').animate({
				scrollTop:0
			},1000)
	})
});
//登录成功以后主页的变化
var name=localStorage.getItem('username');
function login(){
	if(name){
		$('#top-left a').eq(0).html(`欢迎你${name}!`);
		$('#top-left a').eq(1).html('退出');
		$('#top-left a').eq(0).attr('href','http://my.xtep.com.cn/AccountManage/PersonInfo.aspx');
	}
}
login();
//点击购物车跳转
function shopping(){
	if(name){
		$('#top-right a').eq(3).attr('href','../pages/shopping.html');
	}else{
		$('#top-right a').eq(3).attr('href','../pages/denglu.html');
	}
}
shopping();
//鼠标滑过切换图片
$('.picture-l img').mouseover(function(){
	$('.picture-r img').attr('src', $(this)[0].src)
});
//选择颜色时当前高亮
$('.message-1 a').click(function(){
	$('.message-1 a').css('borderColor','#cccccc')
	$(this).css('borderColor','red')
})
//选择当前尺码边框高亮
$('.message-2 a').click(function(){
	$('.message-2 a').css('borderColor','#cccccc')
	$(this).css('borderColor','red')
})
//点击+或者-增加减少商品数量
$('.message-3 a:eq(1)').click(function(){
	var num=$('.message-3 input').val();
	num++;
	$('.message-3 input').val(num++);
});
$('.message-3 a:eq(0)').click(function(){
	var num=$('.message-3 input').val();
	num--;
	$('.message-3 input').val(num++);
	if($('.message-3 input').val()<=0){
		$('.message-3 input').val(0)
	}
});
//点击加入购物车添加商品
$('#addTocart').click(function(){
	$.ajax({
		url:'../interface/addwq.php',
		dataType:'json',
		data:{
			id:$('.shoes-l h2 span').html(),
			img:'../images/xiangqing-6.jpg',
			price1:$('.shoes-l ul li p:eq(0) span').html(),
			price2:$('.shoes-l ul li p:eq(0) span').html(),
			num:$('.message-3 input').val(),
		},
		success:function(res){
			console.log(res)
			if(res.code){
				alert('商品加入成功')
			}else{
				alert('商品加入失败')
			}
		}
	})
})
//计算购物车商品总数量
function Count(){
    $.ajax({
        url:'../interface/showlist.php',
        dataType:'json',
        success:function(res){
			var total=0;
            $.each(res.data,function(index,item){
				var num=parseInt(item.product_num);
                total += num;
                $('#top-right').children().eq(3).children().eq(1).html(`(${total})`);
            })
        }
    })
}
Count();
