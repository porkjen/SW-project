$(document).ready(function() {
    $("#btn_register").click(function(){
        checkRegister($('#account').val(), $('#password').val(), $('#email').val());
    });
});

function checkRegister(user_account, user_password, user_email){
    $.ajax({
        url: '/register',
        type: 'post',
        data: {account : user_account, password: user_password, email: user_email},
        success: function(chkRes){
            if(chkRes.result == "had account"){
                alert("帳號已存在! 請重新輸入!");
                location.reload();
            }
            else if(chkRes.result == "register succ"){
                alert("註冊成功 !");
                location.href="/chooseIdentity_main.html";
            }
            else{
                alert("login error.");
            }
        },
        error: function(){
          alert("wrong");
        }
    })
}
