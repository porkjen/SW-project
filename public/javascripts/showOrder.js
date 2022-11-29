const uri = `http://127.0.0.1:3000/listPassenger`;

// Example POST method implementation:
async function loadOrder() {
    // Default options are marked with *
    const response = await fetch(uri, {
        method: "GET",
        //body:   JSON.stringify(body)
    }).then(response => response.json())
    .then((jsonRes) => {
        var alertContent = "";
        for(var i = 0; i < jsonRes.result.length; i++)
            alertContent = alertContent + jsonRes.result[i].account + " send you an invitation. \n";
        alert(alertContent);
    });

    if (!response){
        alert("no order: " + jsonRes);
    }
    
    return response; // parses JSON response into native JavaScript objects
  }

document.addEventListener("DOMContentLoaded", function(){
    loadOrder();
});
