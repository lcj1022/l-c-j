<?php
    include './base.php';
    //接受前端数据
    $username=$_POST['username'];
    $password=$_POST['password'];
    //连接数据库
    $conn=mysqli_connect('localhost','root','root','music');
    $sql="SELECT  * FROM `user` WHERE `username`='$username' AND `password`='$password'";
    $result=mysqli_query($conn,$sql);
    $data=mysqli_fetch_assoc($result);
    if($data){
        $arr=array('code'=>1,'data'=>array('username'=>$username));
    }else{
        $arr=array('code'=>0,'msg'=>'用户名或密码错误');
    }
    echo json_encode($arr);
?>