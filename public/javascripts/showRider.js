const uri = `http://127.0.0.1:3000/matchOwner`;

var data={};

// Example POST method implementation:
async function loadInfo() {
    // Default options are marked with *
    const response = await fetch(uri, {
        method: "GET"
    }).then((response) => response.text())
    .then(function (responseJSON)  {
       //do stuff with responseJSON here...
       //alert(responseJSON);
    });

    if (!response){
        throw new Error("fail to show riders");
    }
    return response; // parses JSON response into native JavaScript objects
  }

document.addEventListener("DOMContentLoaded", function(){
    loadInfo();
});
