$(document).ready(function(){
  $(".container").empty();
  $.ajax({
      url: 'http://127.0.0.1:3000/listPassenger',
      type: 'get',
      success: function(data){
          for(i = 0;i<5;i++){
            if(data.result[i]){
              console.log(i);
                  $('.container').append(
                      '<div class="card" id="'+i+'">'+
                              '<div class="card-body">'+
                              '<h5 class="card-title">'+data.result[i].name+'</h5>'+
                              '<h6 class="card-subtitle mb-2 text-muted">'+data.result[i].gender+'</h6>'+
                              '<p class="card-text">'+'搭乘地點:'+'<br>'+'目的地:'+'<br>'+'其他資訊:'+'<br>'+data.result[i].other+'</p>'+
                              '<button type="button" class="btn btn-outline-success" id="accept" onclick="getInfo('+i+')">接受</button>'+
                              '<button type="button" class="btn btn-outline-success" id="reject" onclick="removeCard('+i+')">拒絕</button>'+
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
							'<p class="card-text">'+'搭乘地點:'+'<br>'+'目的地:'+'<br>'+'安全帽:'+data.result[i].helmet+'<br>'+'其他資訊:'+'<br>'+data.result[i].other+'</p>'+
							'<button type="button" class="btn btn-outline-success" id="accept" onclick="getInfo('+i+')">接受</button>'+
							'<button type="button" class="btn btn-outline-success" id="reject" onclick="removeCard('+i+')">拒絕</button>'+
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



// function sendMail(n) {
//     fetch('', {
//           body: n, // must match 'Content-Type' header
//           cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached         
//           headers: {
//             'content-type': 'application/json'
//           },
//           method: 'POST', // *GET, POST, PUT, DELETE, etc.
//           mode: 'cors'
//         })
//         .then(response => console.log(n))
//         .then(response => response.json()) 
//         .catch(function() {
//           console.log(n);
//         });

// }

$('.close').click(function(){
    var $target = $(this).parent('div');
    $target.hide('slow',function(){$target.remove();})
})

/*
fetch('http://127.0.0.1:8080/SightAPI?zone=中山',{mode:"cors"})
    .then((response) => {

        return response.json();
    })
    .then( (response) => {
        console.log(response);
    })
    .catch((error) => {
        //console.log(`Error: ${error}`);
    })

*/
/*
<div class="card" id="info_1">
                    <div class="card-body">
                      <h5 class="card-title">林欣儀</h5>
                      <h6 class="card-subtitle mb-2 text-muted">女</h6>
                      <p class="card-text">搭乘地點:<br>目的地:<br>安全帽:<br>其他資訊:<br>sfsfsfsnuinuisnvnsnsndnsiudnfunsfndfkjsdfjnsnsuie</p>
                      <button type="button" class="btn btn-outline-success" id="accept" onclick="sendMail()">接受</button>
                      <button type="button" class="btn btn-outline-success" id="reject" onclick="removeCard()">拒絕</button>
                    </div>
                </div>
*/
