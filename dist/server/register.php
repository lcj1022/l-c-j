<?php
    include './base.php';
    $username=$_POST['username'];
    $password=$_POST['password'];
    $conn=mysqli_connect('localhost','root','root','music');
    $sql="SELECT * FROM `user` WHERE `username`='$username'";
    $result=mysqli_query($conn,$sql);
    $data=mysqli_fetch_assoc($result);
    if($data){
        $arr=array('code'=>0,'msg'=>'用户名已被注册');
    }else{
        $sql="INSERT INTO `user` (`username`,`password`) VALUES ('$username','$password')";
        $result=mysqli_query($conn,$sql);
        if($result){
            $arr=array('code'=>1,'data'=>array('username'=>$username));
        }else{
            $arr=array('code'=>0,'msg'=>'后端出错');
        }
    }
    echo json_encode($arr);
?>