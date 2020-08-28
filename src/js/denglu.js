//登录成功以后页面的变化
var name=localStorage.getItem('username');
function login(){
	if(name){
		$('#top-left a').eq(0).html(`欢迎你${name}!`);
		$('#top-left a').eq(1).html('退出');
		$('#top-left a').eq(0).attr('href','http://my.xtep.com.cn/AccountManage/PersonInfo.aspx');
	}
}
login();
//点击去注册弹出注册页面
$('#denglu .login .user a').click(function(){
    $('.zhuce').css('display','block');
    return false;
})
$('.zhuce .right span').click(function(){
    $('.zhuce').css('display','none')
})
$('.zhuce .right button').click(function(){
    $('.zhuce').css('display','none')
})
//登录
$('.btn').click(function(){
    $.ajax({
        method:'post',
        url:'../server/login.php',
        data:{
            username:$('#un').val(),
            password:$('#pw').val()
        },
        success:function(data){
            if(data.code==1){
                localStorage.setItem('username',data.data.username);
                location.href="../pages/shopping.html"
            }else{
                $('#pp').html(`提示：${data.msg}`)
            }
        },
        dataType:'json'
    })
})
//注册
$('.btn-2').click(function(){
    $.ajax({
        method:'post',
        url:'../server/register.php',
        data:{
            username:$('#username').val(),
            password:$('#password-1').val()
        },
        success:function(data){
            if(data.code==1){
                location.href='../pages/denglu.html';
            }else{
                $('.left p').eq(4).html(data.msg)
            }
        },
        dataType:'json'
    })
})
//两次密码输入不一样
$('.btn-2').click(function(){
    var a=$('#password-1').val();
    console.log($('#password-1').val());
    var b=$('#password-2').val();
    if(a!=b){
        $('.left p').eq(4).html('*提示：两次输入的密码不一样');
    }
})
//未勾选用户协议
// $('.btn-2').click(function(){
//     if($('#inp').attr('checked')){
//         location.href='../pages/denglu.html';
//     }else{
//         $('.left p').eq(4).html('*提示：请选择同意特步用户协议')
//     }
// })

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