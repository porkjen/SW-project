$(document).ready(function() {
    $("#btn_login").click(function(){
        checkLogin($('#account').val(), $('#password').val());
    });
});

function checkLogin(user_account, user_password){
    $.ajax({
        url: '/login',
        type: 'post',
        data: {account : user_account, password: user_password},
        success: function(chkRes){
            if(chkRes.result == "no user"){
                alert("帳號或密碼錯誤! 請重新輸入!");
                location.reload();
            }
            else if(chkRes.result == "find user"){
                alert("登入成功 !");
                location.href="/chooseIdentity.html";
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
