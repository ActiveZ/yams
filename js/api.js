//fichier sur le pc client 	

//var url = "http://frugysoft.planethoster.world/chat/php/api.php" // serveur planethoster
//var url = "http://frugysoft.free.fr/chat/php/api.php" // serveur free frugysoft
//var url = "http://frugysoft.freeboxos.fr:8041/chat/php/api.php"; // serveur pi41
//var url = "http://localhost/chat/php/api.php"; //serveur de ce pc
//var url = "https://tokmo.fr/apiPHP/api.php"; // serveur Jonathan
//var url = "http://frugysoft.free.fr/yams/php/api.php" // serveur free frugysoft
var url = "http://localhost/yams/php/api.php" // serveur local

recevoir();

async function envoyer () {
    let pseudo = document.getElementById('pseudo').value;
    let score = document.getElementById('score').value;
    if (pseudo === "" || score === "") return;

    let request = new Request(url, {
        method: 'POST',
        headers:{
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            'action': 'sendMessages',
            'pseudo': pseudo,
            'score': score
        })
    });

    fetch(request);
    document.getElementById('message').value = "";
}



async function recevoir () {
    let data;
    let msg = "";

    let request = new Request(url, {
        method: 'POST',
        headers:{
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            'action': 'getMessages'
        })
    });
      
    response = await fetch(request);
    if (response.ok) {
        data = await response.json();
    }
    //console.log(data);
    
    for (let d in data) {
        let date = new Date(data[d].dateTimestamp); // pour serveur perso
        // let date = new Date(data[d].dateTimestamp * 1000); // pour serveur Jonathan
        msg += "Le " + date.toLocaleString() + ", " + data[d].pseudo + " a écrit: " + data[d].score + "\n";
    }

    document.getElementById('txtArea').innerHTML=msg;

    // return
    setTimeout(() => {
        recevoir()
    }, 1000)
}