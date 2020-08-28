//匀速运动轮播图
var odiv = document.getElementById('yunsu');
var oul = odiv.getElementsByTagName('ul')[0];
var ali = oul.getElementsByTagName('li');
var spa = -2;				
oul.innerHTML=oul.innerHTML+oul.innerHTML;
oul.style.width=ali[0].offsetWidth*ali.length+'px';
function move(){
	if(oul.offsetLeft<-oul.offsetWidth/2){
		oul.style.left='0';
	}
	if(oul.offsetLeft>0){
		oul.style.left=-oul.offsetWidth/2+'px'
	}
	oul.style.left=oul.offsetLeft+spa+'px';
}
var timer = setInterval(move,30)

odiv.onmousemove=function(){clearInterval(timer);}
odiv.onmouseout=function(){timer = setInterval(move,30)};
document.getElementsByTagName('a')[0].onclick = function(){
	spa=-2;
}
document.getElementsByTagName('a')[1].onclick = function(){
	spa=2;
}
//回到顶部
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
	})

	//2 这个按钮一点击,让浏览器滚动到顶部
	$('.goTop').click(()=>{
			$('html').animate({
				scrollTop:0
			},1000)
	})
})
//秒杀
var timeID=setInterval(function(){
	var now=new Date();
	var end=new Date(2020,8,26,23,0,0);
	now=now.getTime();
	end=end.getTime();
	var w=end-now;
	var hour=Math.floor(w/1000/60/60%24);
	var minute=Math.floor(w/1000/60%60);
	var second=Math.floor(w/1000%60);
	document.getElementById("h").innerHTML=hour;
	document.getElementById("m").innerHTML=minute;
	document.getElementById("s").innerHTML=second;
},1000)
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




			
		
