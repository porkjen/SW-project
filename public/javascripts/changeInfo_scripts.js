function checkOwner(){
    $.ajax({
        url: 'http://127.0.0.1:3000/showIdentify',
        type: 'get',
        success: function(data){
            if(data.result.identityO==null){
                location.href="http://127.0.0.1:3000/ownerInfo.html";
            }
            else if(data.result.identityO!=null){
                location.href="http://127.0.0.1:3000/mainPage.html";
            }
        },
        error: function(){
          alert("wrong");
        }
      })
}

function checkPassenger(){
    $.ajax({
        url: 'http://127.0.0.1:3000/showIdentify',
        type: 'get',
        success: function(data){
            if(data.result.identityP==null){
                location.href="http://127.0.0.1:3000/passagerInfo.html";
            }
            else if(data.result.identityP!=null){
                location.href="http://127.0.0.1:3000/showRider.html";
            }
        },
        error: function(){
            console.log(data);
          alert("wrong");
        }
      })
}