//增加搭乘時間
//Client ID:73d766fcb0de170 Client secret:d15fa884f676e9c4d5ec0528b4c9f510ce72b76d
//https://imgur.com/#access_token=367fae1c61694fbd3b82c7eac77fb680f6d32a52&expires_in=315360000&token_type=bearer&refresh_token=d6cd7b8e0e067ba6f6292f0e85a7d1c24543efcb&account_username=face021616&account_id=59042281
$(document).ready(function(){
  $(".container").empty();
  $.ajax({
      url: 'http://127.0.0.1:3000/listPassenger',
      type: 'get',
      success: function(data){
          for(i = 0; i < 5; i++){
            if(data.result[i]){
              console.log(i);
                  $('.container').append(
                      '<div class="card" id="'+i+'">'+
                              '<div class="card-body">'+
                              '<h5 class="card-title">'+data.result[i].name+'</h5>'+
                              '<h6 class="card-subtitle mb-2 text-muted">'+data.result[i].gender+'</h6>'+
                              '<p class="card-text">'+'搭乘地點:'+'<br>'+'目的地:'+'<br>'+'其他資訊:'+'<br>'+data.result[i].other+'</p>'+
                              '<button type="button" class="btn btn-outline-success" id="accept" onclick="getInfo('+i+')">接受</button>'+
                              '<button type="button" class="btn btn-outline-success" id="reject" data-bs-toggle="modal" data-bs-target="#staticBackdrop" onclick="removeCard('+i+')">拒絕</button>'+
                            '</div>'+
                            '<div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">'+
                              '<div class="modal-dialog">'+
                                '<div class="modal-content">'+
                                  '<div class="modal-header">'+
                                    '<h5 class="modal-title" id="staticBackdropLabel">拒絕原因</h5>'+
                                    '<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>'+
                                  '</div>'+
                                  '<div class="modal-body">'+
                                    '<form action="" method="post">'+
                                      '<input type="text" class="other_info" name="other" id="other" value="" height="50px" width="50px">'+
                                  '</div>'+
                                  '<div class="modal-footer">'+
                                    '<button type="submit" class="btn btn-outline-success" data-bs-dismiss="modal">確認</button>'+
                                  '</div>'+
                                  '</form>'+
                                '</div>'+
                              '</div>'+
                            '</div>'+
                      '</div>'
                  )
            }
          }
      },
      error: function(){
        alert("wrong");
      }
    })
})

function btn1(){
    //$(".card-group").empty();
    $.ajax({
        url: 'http://127.0.0.1:3000/listPassenger',
        type: 'get',
        success: function(data){
            for(i = 0; i < 5; i++){
              if(data.result[i]){
                console.log(i);
                $('.container').append(
                  '<div class="card" id="'+i+'">'+
                          '<div class="card-body">'+
                          '<h5 class="card-title">'+data.result[i].name+'</h5>'+
                          '<h6 class="card-subtitle mb-2 text-muted">'+data.result[i].gender+'</h6>'+
                          '<p class="card-text">'+'搭乘地點:'+'<br>'+'目的地:'+'<br>'+'其他資訊:'+'<br>'+data.result[i].other+'</p>'+
                          '<button type="button" class="btn btn-outline-success" id="accept" onclick="getInfo('+i+')">接受</button>'+
                          '<button type="button" class="btn btn-outline-success" id="reject" data-bs-toggle="modal" data-bs-target="#staticBackdrop" onclick="removeCard('+i+')">拒絕</button>'+
                        '</div>'+
                        '<div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">'+
                          '<div class="modal-dialog">'+
                            '<div class="modal-content">'+
                              '<div class="modal-header">'+
                                '<h5 class="modal-title" id="staticBackdropLabel">拒絕原因</h5>'+
                                '<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>'+
                              '</div>'+
                              '<div class="modal-body">'+
                                '<form action="" method="post">'+
                                  '<input type="text" class="other_info" name="other" id="other" value="" height="50px" width="50px">'+
                              '</div>'+
                              '<div class="modal-footer">'+
                                '<button type="submit" class="btn btn-outline-success" data-bs-dismiss="modal">確認</button>'+
                              '</div>'+
                              '</form>'+
                            '</div>'+
                          '</div>'+
                        '</div>'+
                  '</div>'
              )
              }
            }
        },
        error: function(){
          alert("wrong");
        }   
      })
}

function removeCard(num){
    var eDiv = document.getElementById(num);
    eDiv.parentNode.removeChild(eDiv);
}

function getInfo(num){
    $.ajax({
        url: 'http://127.0.0.1:3000/listPassenger',
        type: 'get',
        success: function(data){
           info = JSON.stringify(data.result[num]);
           sendMail(info);
        },
        error: function(){
          alert("wrong");
        }
      })
}

function uploadPicture(){
  $.ajax({
    url: 'http://127.0.0.1:3000/upload',
    success: function(e){
      const formData = new FormData();
      formData.append('file-to-upload', e.target.form[0].files[0]);
      axios.post('/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
    },
    error: function(){
      alert("wrong");
    }
  })
  
}


$('.close').click(function(){
    var $target = $(this).parent('div');
    $target.hide('slow',function(){$target.remove();})
})

