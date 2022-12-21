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
                location.href="/ownerInfo.html";
            }
            else if(chkRes.result == "find owner"){
                location.href="/mainPage.html";
            }
        },
        error: function(){
          alert("wrong");
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
                location.href="/passagerInfo.html";
            }
            else if(chkRes.result == "find passenger"){
                location.href="/showRider.html";
            }
        },
        error: function(){
            console.log(chkRes);
            alert("wrong");
        }
      })
}