const uri = `http://127.0.0.1:3000/listPassenger`;

// Example POST method implementation:
async function loadOrder() {
    // Default options are marked with *
    const response = await fetch(uri, {
        method: "GET"
    }).then(response => response.json())
    .then((jsonRes) => {
        if(!jsonRes.result.length) alert("no order");
        else{
            var alertContent = "";
            for(var i = 0; i < jsonRes.result.length; i++)
                alertContent = alertContent + jsonRes.result[i].account + " send you an invitation. \n";
            //alert(alertContent);
        }
    });
    
    return response; // parses JSON response into native JavaScript objects
  }

document.addEventListener("DOMContentLoaded", function(){
    loadOrder();
});
