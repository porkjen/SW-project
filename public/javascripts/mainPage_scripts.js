//增加搭乘時間
//Client ID:73d766fcb0de170 Client secret:d15fa884f676e9c4d5ec0528b4c9f510ce72b76d
//https://imgur.com/#access_token=367fae1c61694fbd3b82c7eac77fb680f6d32a52&expires_in=315360000&token_type=bearer&refresh_token=d6cd7b8e0e067ba6f6292f0e85a7d1c24543efcb&account_username=face021616&account_id=59042281
$(document).ready(function(){
	$(".container").empty();
	listPassengers();
	$("#btn_logout").click(function(){
		logout();
	});
})

function listPassengers(){
	$.ajax({
		url: '/listPassenger',
		type: 'post',
		success: function(data){													
			for(i = 0; i < data.result.length; i++){
				if(data.result[i]){
					console.log(i);
					$('.container').append(
						'<div class="card" id="'+i+'">'+
							'<div class="card-body">'+
								'<h5 class="card-title">'+data.result[i].name+'</h5>'+
								'<h6 class="card-subtitle mb-2 text-muted">'+data.result[i].gender+'</h6>'+
								'<p class="card-text">'+'搭乘地點: '+data.result[i].takingPlace+'<br>'+'搭乘時間: '+data.result[i].takingTime+'<br>'+'目的地: '+data.result[i].destination+'<br>'+'其他資訊: '+data.result[i].other+'<br>'+'備註: '+data.result[i].remark+'<br>'+'</p>'+
								'<button type="button" class="btn btn-outline-success" id="accept" onclick="accept_getInfo('+i+')">接受</button>'+
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
				else alert("目前沒有共乘邀請喔!")
			}
		},
		error: function(){
			alert("wrong");
		}
    });
}

function logout(){
	$.ajax({
		url: '/logout',
		type: 'POST',
		success:function(logoutRes){
			if(logoutRes.result == "logout succ"){
				alert("登出成功!");
				location.href="/SignIn.html";
			}
		},
		error: function(){
			alert("登出失敗!");
		}    
	});
}

function removeCard(num){
    var eDiv = document.getElementById(num);
    eDiv.parentNode.removeChild(eDiv);
}

function acceptRequest(resData){
	$.ajax({
		url: '/acceptOrder',
		type: 'POST',
		data: {account: resData.account},
		success:function(acceptRes){
			if(acceptRes.result == "accept request succ"){
				location.href = "/going.html"  
			}
		}       
	})
}

function accept_getInfo(c){
	$.ajax({
		url : '/listPassenger',
		type : 'POST',
		success:function(data){
			result_c = data.result[c];
			acceptRequest(result_c);       
		}       
	})
}

function uploadPicture(){
  const input = document.querySelector('#fileUpload');

  const formData = new FormData();
  //formData.append('fileUpload', input.files[0]);
  formData.append('fileUpload', $('input[name="fileUpload"]').get(0).files[0]);
  console.log( $('input[name="fileUpload"]').get(0).files[0]);
  $.ajax({
    type: "POST",
    url: '/uploadPhoto',
    data: formData,
    processData : false, 
    contentType : false,
    dataType: "json",
    success: function(data) {
      console.log(data);
    }
  });
  
  
}


$('.close').click(function(){
    var $target = $(this).parent('div');
    $target.hide('slow',function(){$target.remove();})
})

