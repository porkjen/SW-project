
function btn1(zone){
    $(".get_info").empty();
    $.ajax({
        url: '',
        type: 'get',
        success: function(data){
          for(i = 0;i<5;i++){
              if(data[i]){
                    $('.get_info').append(
                        '<table>'+
                        '<tr>'

                    )
              }

          }
        },
        error: function(){
          //alert("wrong");
        }
      })
}

function removeCard(){
    var eDiv = document.getElementById("info_1");
    eDiv.parentNode.removeChild(eDiv);
}

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
