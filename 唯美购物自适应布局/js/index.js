$(function(){

    $('.logBtn').click(function(){
        $('#userLogin').css('display','block')
    })

   //遮罩画布
    var screen = $('#screen');
    
    //登录框
    var login = $('#userLogin');
    login.center(350, 250).resize(function () {
        if (login.css('display') == 'block') {
            screen.lock();
        }
    });
});

