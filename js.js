
var nbJoueurs = 2;
init(nbJoueurs); // init avec 2 joueurs
var bRayer = false;
var bCancelRayer = false;

document.getElementById("btRejouer").onclick =function () {
  bRayer = false;
  bCancelRayer = false;
  document.getElementById("btRayer").innerHTML = "Rayer";
  document.getElementById("btRayer").style.backgroundColor = "white";

  for (let i = 1; i <= nbJoueurs; i++) {
    let x = document.getElementsByClassName("j" + i + " part1");
    let y = document.getElementsByClassName("j" + i + " part2");

    for (let j = 0; j < x.length; j++) {
      x[j].value = ""; // annulation des combinaisons
      x[j].style.backgroundColor = "white";
      x[j].style.visibility = "visible";
     }

     y[0].value = "" ; // annulation des brelans
     x[0].style.visibility = "visible";

    for (let j = 1; j < y.length; j++) {
    y[j].checked = false; // annulation des cac
    y[j].style.visibility = "visible";
    }

    document.getElementById("total1Joueur" + i).innerHTML = "";
    document.getElementById("totalPrimeJoueur" + i).innerHTML = "";
    document.getElementById("total2Joueur" + i).innerHTML = "";
    document.getElementById("generalJoueur" + i).innerHTML = "";
  }
}


/*************************************************************************/


function rayer() {
  let bt = document.getElementById("btRayer");

  if (!bRayer && !bCancelRayer) {
    bRayer = true;
    bt.style.backgroundColor = "red";
    bt.innerHTML = "Rayer";
  }

  else if (bRayer && !bCancelRayer) {
    bRayer = false;
    bCancelRayer = true;
    bt.style.backgroundColor = "lightgreen";
    bt.innerHTML = "Annuler";

  }

  else if (bCancelRayer) {
    bCancelRayer = false;
    bt.style.backgroundColor = "white";
    bt.innerHTML = "Rayer";
  }
}


/**************************************************************************/

// vérifie qu'une ligne est rayable (pas utilisée)
// Bug: ne fonctionne pas avec les cac
function verifRayer(element) {
  if (bRayer) {
    //console.log(element);
    //console.log(element.children[0]);
    if (element.children[0].type === "text" && element.children[0].value != "") return;
    
    // if (element.children[0].type === "checkbox" && !element.checked) {
    //   console.log("ok");
    //   element.style.visibility = "hidden";
    //   element.children[0].style.visibility = "hidden";
    //   return;
    // } 
    
    if (element.children[0].type === "checkbox" && element.children[0].checked) return;
    if (element.type === "checkbox" && element.checked) return;

    //element.children[0].remove();
    element.children[0].style.visibility = "hidden";
    rayer();
  }
  else if (bCancelRayer) {
    element.children[0].style.visibility = "visible";
    rayer();
  }
  else calcul();
}


/**************************************************************************/


// vérifie la cohérence de la valeur en fonction de la combinaison de dé 
function isCoherent (combi, val) {
  if (val < 0 || val > 30) return false;
  switch (combi) {
    case 1:
      if (val < 6) return true;
      break;
    case 2:
      if ([0,2,4,6,8,10].includes(val)) return true;
      break;
    case 3:
      if ([0,3,6,9,12,15].includes(val)) return true;
      break;    
    case 4:
      if ([0,4,8,12,16,20].includes(val)) return true;
      break;    
    case 5:
      if ([0,5,10,15,20,25].includes(val)) return true;
      break;    
    case 6:
      if ([0,6,12,18,24,30].includes(val)) return true;
      break;
  }
  return false;
}


/*************************************************************************/


function calcul() {
  for (let i = 1; i <= nbJoueurs; i++) {
    let x = document.getElementsByClassName("j" + i + " part1");
    let y = document.getElementsByClassName("j" + i + " part2");
    let total1 = 0;
    let delta = 0; // écart/prime
    
    for (let j = 0; j < x.length; j++) {
      //console.log("j: " + j + "  val: " + x[j].value);
      if (!isNaN(Number(x[j].value)) && x[j].value != "") { // doublon avec isCoherent
        if (!isCoherent(j+1, Number(x[j].value))) {
          x[j].value = ""; 
          return;
        }
        x[j].style.backgroundColor = x[j].value >= (j+1)*3 ? "lightgreen" : "red";
        total1 += Number(x[j].value);
        delta += x[j].value - (j+1)*3;
      } else {
        x[j].style.backgroundColor = "white";
      }
    }
    
    let total2 = 0;
    if (!isNaN(Number(y[0].value)) && y[0].value != "" && y[0].value >= 0 && y[0].value < 37) {
      total2 = Number(y[0].value); // valeur brelan
    }

    for (let j = 1; j < y.length; j++) {
      if (y[j].checked) {
        total2 += Number(y[j].value);
      }
    }

    document.getElementById("total1Joueur" + i).innerHTML = total1 + " (" + delta + ")";
    if (total1 > 62) {total1 += 37}
    document.getElementById("totalPrimeJoueur" + i).innerHTML = total1;

    document.getElementById("total2Joueur" + i).innerHTML = total2;

    document.getElementById("generalJoueur" + i).innerHTML = total1 + total2;

  }
};


/**************************************************************************/


function init(n) {
  nbJoueurs = n;
  let tablo="";
  let i;

  tablo = '<table>';
  
  tablo += '<tr><th>COMBINAISONS</th><th colspan="' + nbJoueurs + '">NOMS DES JOUEURS</th><th>MARQUE</th></tr>';
  
  tablo += '<thead>';
    
    tablo += '<tr><td></td>';
    for (i=1; i<=nbJoueurs; i++) {
      tablo += '<td><input class="nomJoueur" value="Joueur' + i + '"></td>';
    }
    tablo += '<td></td></tr>';

  tablo += '</thead>';

  // les 1
  tablo += '<tr><td><span>&#9856;</span> 1</td>';
  for (i=1; i<=nbJoueurs; i++) {
    tablo += '<td onclick="verifRayer(this)"><input class="j' + i +' part1" onChange="calcul(this.class)" type="text"></td>';
  }
  tablo += '<td>les as</td></tr>';
  
  // les 2
  tablo += '<tr><td><span>&#9857;</span> 2</td>';
  for (i=1; i<=nbJoueurs; i++) {
    tablo += '<td onclick="verifRayer(this)"><input class="j' + i + ' part1" onChange="calcul(this.class)" type="text"></td>';
  }
  tablo += '<td>les 2</td></tr>';
  
  // les 3
  tablo += '<tr><td><span>&#9858;</span> 3</td>';
  for (i=1; i<=nbJoueurs; i++) {
    tablo += '<td onclick="verifRayer(this)"><input class="j' + i + ' part1" onChange="calcul(this.class)" type="text"></td>';
  }
  tablo += '<td>les 3</td></tr>';
  
  //les 4
  tablo += '<tr><td><span>&#9858;</span> 4</td>';
  for (i=1; i<=nbJoueurs; i++) {
    tablo += '<td onclick="verifRayer(this)"><input class="j' + i + ' part1" onChange="calcul(this.class)" type="text"></td>';
  }
  tablo += '<td>les 4</td></tr>';
  
  //les 5
  tablo += '<tr><td><span>&#9858;</span> 5</td>';
  for (i=1; i<=nbJoueurs; i++) {
    tablo += '<td onclick="verifRayer(this)"><input class="j' + i + ' part1" onChange="calcul(this.class)" type="text"></td>';
  }
  tablo += '<td>les 5</td></tr>';
  
  //les 6
  tablo += '<tr><td><span>&#9858;</span> 6</td>';
  for (i=1; i<=nbJoueurs; i++) {
    tablo += '<td onclick="verifRayer(this)"><input class="j' + i + ' part1" onChange="calcul(this.class)" type="text"></td>';
  }
  tablo += '<td>les 6</td></tr>';
  
// TOTAL 1

  tablo += '<tr><td>Total partiel</td>';
  for (i=1; i<=nbJoueurs; i++) {
    tablo += '<td id="total1Joueur' + i + '"></td>';
  }
  tablo += '<td>TOTAL &#10112;</td></tr><tr><td>+ prime de 37 si total &ge; 63</td>';
  for (i=1; i<=nbJoueurs; i++) {
    tablo += '<td id="totalPrimeJoueur' + i + '"></td>';
  }
  tablo += '<td>Total &#10112; + PRIME éventuelle</td></tr>';

  /////////////////////////////////// PARTIE 2 /////////////////////////////////////

  //chance
  tablo += '<tr><td>CHANCE</td>';
  for (i=1; i<=nbJoueurs; i++) {
    tablo += '<td onclick="verifRayer(this)"><input class="j' + i + ' part2" onChange="calcul(this.class)" type="text"></td>';
  }
  tablo += '<td>La somme des 5 dés</td></tr>';

  //brelan
  tablo += '<tr><td>BRELAN <br> 3 faces identiques</td>';
  for (i=1; i<=nbJoueurs; i++) {
    tablo += '<td onclick="verifRayer(this)"><input class="j' + i + ' part2" type="checkbox" value="15" onChange="verifRayer(this)"></td>';
  }
  tablo += '<td>15</td></tr>';

  //petite suite
  tablo += '<tr><td>PETITE SUITE <br>4 dés</td>';
  for (i=1; i<=nbJoueurs; i++) {
    tablo += '<td onclick="verifRayer(this)"><input class="j' + i + ' part2" type="checkbox" value="20" onChange="verifRayer(this)"></td>';
  }
  tablo += '<td>20</td></tr>';

  //grande suite
  tablo += '<tr><td>GRANDE SUITE <br>5 dés</td>';
  for (i=1; i<=nbJoueurs; i++) {
    tablo += '<td onclick="verifRayer(this)"><input class="j' + i + ' part2" type="checkbox" value="30" onChange="verifRayer(this)"></td>';
  }
  tablo+= '<td>30</td></tr>';
  
  //full
  tablo += '<tr><td>FULL <br> brelan + paire</td>';
  for (i=1; i<=nbJoueurs; i++) {
    tablo += '<td onclick="verifRayer(this)"><input class="j' + i + ' part2" type="checkbox" value="30" onChange="verifRayer(this)"></td>';
  }
  tablo += '<td>30</td></tr>';
  
  //carré
  tablo += '<tr><td>CARRE <br> 4 faces identiques</td>';
  for (i=1; i<=nbJoueurs; i++) {
    tablo += '<td onclick="verifRayer(this)"><input class="j' + i + ' part2" type="checkbox" value="40" onChange="verifRayer(this)"></td>';
  }
  tablo += '<td>40</td></tr>';
  
  //yam
  tablo += '<tr><td>YAM <br> 5 faces identiques</td>';
  for (i=1; i<=nbJoueurs; i++) {
    tablo += '<td onclick="verifRayer(this)"><input class="j' + i + ' part2" type="checkbox" value="50" onChange="verifRayer(this)"></td>';
  }
  tablo += '<td>50</td></tr>';
  
// TOTAL 2

  tablo += '<tr><td>TOTAL partiel</td>';
  for (i=1; i<=nbJoueurs; i++) {
    tablo += '<td id="total2Joueur' + i + '"></td>';
  }
  tablo += '<td>TOTAL &#10113;</td></tr>';
  
// TOTAL GENERAL

  tablo += '<tr><td>TOTAL GENERAL</td>';
  for (i=1; i<=nbJoueurs; i++) {
    tablo += '<td id="generalJoueur' + i + '"></td>';
  }
  tablo += '<td>&#10112; + PRIME + &#10113;</td></tr>';
  
  tablo += '</table>';

  document.getElementById("main").innerHTML = tablo;

}