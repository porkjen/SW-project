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
                swal({
                    title: "帳號或密碼錯誤! 請重新輸入!",
                    icon: "error",
                }).then(function () {
                    location.reload();
                });
            }
            else if(chkRes.result == "find user"){
                swal({
                    title: "登入成功 !",
                    icon: "success",
                }).then(function () {
                    location.href="/chooseIdentity.html";
                });
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
