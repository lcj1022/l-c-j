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
//点击加入购物车添加商品
$('.cheap p').click(function(){
	$.ajax({
		url:'../interface/addwq.php',
		dataType:'json',
		data:{
			id:$(this).parent().children().eq(4).children().html(),
			img:$(this).parent().children().eq(0).children().attr('src'),
			price1:$(this).parent().children().eq(2).html(),
			price2:$(this).parent().children().eq(1).children().html(),
			num:'1',
		},
		success:function(res){
			if(res.code){
				alert('商品加入成功')
			}else{
				alert('商品加入失败')
			}
		}
	})
})
//查询并显示购物车并计算总价格
function showCart(){
	$.ajax({
	url:'../interface/showlist.php',
	dataType:'json',
	success:function(res){
		$('#shopping ul').html("");
		$.each(res.data,function(index,item){
            var a=item.product_price2;
            var b=item.product_num;
            var a=a.replace('￥','');
            var money=a*b;
			$('#shopping ul').append(`
			<li>
                    <input type="checkbox" class="xuanze">
                    <img src="${item.product_img}">
                    <div class="box1">
                        <a href="">${item.product_id}</a>
                        <br/><span>颜色：橙色 尺码：3XL</span>
                    </div>
                    <div class="box2">
                        <span>${item.product_price1}</span>
                        <span>${item.product_price2}</span>
                    </div>
                    <div class="box3">
                        <a href="../pages/shopping.html" class="delNum">-</a>
                        <input type="text" value="${item.product_num}">
                        <a href="../pages/shopping.html" class="le">+</a>
                    </div>
                    <span>￥${money}</span>
                    <a href="../pages/shopping.html" class="delProduct">删除</a>
                </li>
			`)
		})
	}
	})
}
showCart()
//删除商品
$('.shopping-main ul').on('click','.delProduct',function(){
    var id = $(this).parent().children().eq(2).children().eq(0).html();
    $.ajax({
        url:"../interface/delwq.php",
        data:{
            id:id
        },
        dataType:'json',
        success:function(res){
            if(res.code){
                showCart()
            }
        }
    })
    
})
//增加商品
$('.shopping-main ul').on('click','.le',function(){
    var id = $(this).parent().parent().children().eq(2).children().eq(0).html();
    $.ajax({
        url:"../interface/updatewq.php",
        dataType:'json',
        data:{
            type:'add',
            id:id
        },
        success:function(res){
            if(res.code){
                alert('商品增加成功')
            }
        }
    })
})
//减少商品数量
$('.shopping-main ul').on('click','.delNum',function(){
    var id = $(this).parent().parent().children().eq(2).children().eq(0).html();
    $.ajax({
        url:"../interface/updatewq.php",
        dataType:'json',
        data:{
            type:'',
            id:id
        },
        success:function(res){
            if(res.code){
                alert('商品减少成功')
            }
        }
    })
})
//计算商品总数量
function Count(){
    $.ajax({
        url:'../interface/showlist.php',
        dataType:'json',
        success:function(res){
            var total1 = 0;
            var total = 0;
            var total2=0;
            $.each(res.data,function(index,item){
               var num=parseInt(item.product_num);
               var price1 = item.product_price1.substring(1);
               var price2 = item.product_price2.substring(1);
               total+= num*price2;
               total2+= num*price1;
                total1+=num;
                var cha=total2-total;
                $('.jiesuan').children().eq(1).children().eq(0).html(total1);
                $('#top-right').children().eq(3).children().eq(1).html(`(${total1})`);
                $('.money').children().children().eq(0).children().eq(0).html(`￥${total}`);
                $('.money').children().children().eq(1).children().eq(0).html(`￥${cha}`);
            })
        }
    })
}
Count();
//复选框
$('.jiesuan div input').click(function(){
    if($(this).prop('checked')){
            $('.shopping-main ul li input:even').prop('checked',true);
        }else{
            $('.shopping-main ul li input:even').prop('checked',false);
        }
    })
$('.message input').click(function(){
    if($(this).prop('checked')){
            $('.shopping-main ul li input:even').prop('checked',true);
        }else{
            $('.shopping-main ul li input:even').prop('checked',false);
        }
    });
$('.shopping-main ul').on('click','.xuanze',function(){
    $('.jiesuan div input').prop('checked',false);
    $('.message input').prop('checked',false);
})
//批量删除
$('.jiesuan div a').click(function(){
    var arr='';
    $.each($('.xuanze'),function(index,item){
        if($(item).prop('checked')){
            var id = $('.xuanze').parent().children().eq(2).children().eq(0).html();
           }else{
               id='';
           }
           console.log(id);
    })
    
    $.ajax({
        url:"../interface/delwq.php",
        data:{
            id:id
        },
        dataType:'json',
        success:function(res){
            if(res.code){
                showCart()
            }
        }
    })
    
})



    
    




    

