const uri = `http://127.0.0.1:3000/login`;

// Example POST method implementation:
async function loadLogin() {
    // Default options are marked with *
    const response = await fetch(uri, {
        method: "POST", 
        body:   JSON.stringify(body)
    }).then((response) => response.json())
    .then((jsonRes) => {
        alert(jsonRes);
    });

    if (response.status == "no found"){
        alert("no this user: " + jsonRes);
    }
    
    return response; // parses JSON response into native JavaScript objects
  }

document.addEventListener("DOMContentLoaded", function(){
    loadLogin();
});
