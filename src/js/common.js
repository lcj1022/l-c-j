$(window).scroll(function(){
    if($('html').scrollTop()>=130){
        $('#nav-inner').addClass('fix')
        $('.guding').css('margin-top','40px')
    }else{
        $('#nav-inner').removeClass('fix')

    }
})


