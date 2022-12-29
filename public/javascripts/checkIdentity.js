$(document).ready(function() {
    $("#btn_choose_owner").click(function(){
        checkOwner();
    });
    $("#btn_choose_passenger").click(function(){
        checkPassenger();
    });
});

function checkOwner(){
    $.ajax({
        url: '/showIdentify',
        type: 'post',
        data: {identity : "owner"},
        success: function(chkRes){
            if(chkRes.result == "no owner"){
                swal({
                    title: "還沒有註冊車主身分喔~",
                    text: "去註冊一個?",
                    icon: "warning",
                    buttons: {
                        cancel: {
                            text: "取消",
                            visible: true
                        },
                        comfirm: {
                            text: "好",
                            value: "yes",
                            visible: true
                        }
                    }
                }).then((choice) => {
                    if(choice == "yes") {
                        location.href="/ownerInfo.html";
                    }
                });
            }
            else if(chkRes.result == "find owner"){
                location.href="/mainPage.html";
            }
        },
        error: function(){
            swal("There is something wrong.", "", "error");
        }
    })
}

function checkPassenger(){
    $.ajax({
        url: '/showIdentify',
        type: 'post',
        data: {identity : "passenger"},
        success: function(chkRes){
            if(chkRes.result == "no passenger"){
                swal({
                    title: "還沒有註冊乘客身分喔~",
                    text: "去註冊一個?",
                    buttons: {
                        cancel: {
                            text: "取消",
                            visible: true
                        },
                        comfirm: {
                            text: "好",
                            value: "yes",
                            visible: true
                        }
                    }
                }).then((choice) => {
                    if(choice == "yes") {
                        location.href="/passagerInfo.html";
                    }
                });
            }
            else if(chkRes.result == "find passenger"){
                location.href="/showRider.html";
            }
        },
        error: function(){
            swal("There is something wrong.", "", "error");
        }
      })
}