function btn1(){
    //$(".card-group").empty();
    $.ajax({
        url: 'http://127.0.0.1:3000/all',
        type: 'get',
        success: function(data){
            for(i = 0;i<5;i++){
                console.log(data.data[i].status);
              if(data.data[i]){
                console.log(i);
                    $('.container').append(
                        '<div class="card">'+
                                '<div class="card-body">'+
                                '<h5 class="card-title">'+data.data[i].name+'</h5>'+
                                '<h6 class="card-subtitle mb-2 text-muted">'+data.data[i].gender+'</h6>'+
                                '<p class="card-text">'+'搭乘地點:'+'<br>'+'目的地:'+'<br>'+'安全帽:'+'<br>'+'其他資訊:'+'<br>'+'sfsfsfsnuinuisnvnsnsndnsiudnfunsfndfkjsdfjnsnsuie'+'</p>'+
                                '<button type="button" class="btn btn-outline-success" id="'+data.data[i].email+'" onclick="sendMail(this.id)">接受</button>'+
                                '<button type="button" class="btn btn-outline-success" id="reject" onclick="removeCard()">拒絕</button>'+
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

function removeCard(){
    var eDiv = document.getElementById("container");
    eDiv.parentNode.removeChild(eDiv);
}




$('.close').click(function(){
    var $target = $(this).parent('div');
    $target.hide('slow',function(){$target.remove();})
})
