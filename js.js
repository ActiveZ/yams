var nbJoueurs = 2;
init(nbJoueurs); // init avec 2 joueurs
var bRayer = false;

document.getElementById("btRejouer").onclick =function () {
  bRayer = false;
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
  bRayer = !bRayer;
  document.getElementById("btRayer").style.backgroundColor = bRayer ? "red" : "white";
}


/**************************************************************************/


function verifRayer(element) {
  if (bRayer) {
    //console.log(element.children[0]);
    if (element.children[0].type === "text" && element.children[0].value != "") return;
    if (element.children[0].type === "checkbox" && element.children[0].checked) return;
    //element.children[0].remove();
    element.children[0].style.visibility = "hidden";
    rayer();
  }
}


/**************************************************************************/


function calcul() {
  for (let i = 1; i <= nbJoueurs; i++) {
    let x = document.getElementsByClassName("j" + i + " part1");
    let y = document.getElementsByClassName("j" + i + " part2");
    let total1 = 0;
    
    for (let j = 0; j < x.length; j++) {
      //console.log("j: " + j + "  val: " + x[j].value);
      if (!isNaN(Number(x[j].value)) && x[j].value != "") {
        x[j].style.backgroundColor = x[j].value >= (j+1)*3 ? "lightgreen" : "red";
        total1 += Number(x[j].value);
      } else {
        x[j].style.backgroundColor = "white";
      }
    }
    
    let total2 = 0;
    if (!isNaN(Number(y[0].value)) && y[0].value != "") {
      total2 = Number(y[0].value); // valeur brelan
    }

    for (let j = 1; j < y.length; j++) {
      if (y[j].checked) {
        total2 += Number(y[j].value);
      }
    }

    document.getElementById("total1Joueur" + i).innerHTML = total1;
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

  tablo = '<table><tr><th>COMBINAISONS</th><th colspan="' + nbJoueurs + '"\
  >NOMS DES JOUEURS</th><th>MARQUE</th></tr><tr><td></td>';
  for (i=1; i<=nbJoueurs; i++) {
    tablo += '<td><input class="nomJoueur" value="Joueur' + i + '"></td>';
  }

  tablo += '<td></td></tr><tr><td><span>&#9856;</span> 1</td>';
  for (i=1; i<=nbJoueurs; i++) {
    tablo += '<td onclick="verifRayer(this)"><input class="j' + i +' part1" onChange="calcul(this.class)" type="text"></td>';
  }
  tablo += '<td>les as</td></tr><tr><td><span>&#9857;</span> 2</td>';
  for (i=1; i<=nbJoueurs; i++) {
    tablo += '<td onclick="verifRayer(this)"><input class="j' + i + ' part1" onChange="calcul(this.class)" type="text"></td>';
  }
  tablo += '<td>les 2</td></tr><tr><td><span>&#9858;</span> 3</td>';
  for (i=1; i<=nbJoueurs; i++) {
    tablo += '<td onclick="verifRayer(this)"><input class="j' + i + ' part1" onChange="calcul(this.class)" type="text"></td>';
  }
  tablo += '<td>les 3</td></tr><tr><td><span>&#9858;</span> 4</td>';
  for (i=1; i<=nbJoueurs; i++) {
    tablo += '<td onclick="verifRayer(this)"><input class="j' + i + ' part1" onChange="calcul()this.class" type="text"></td>';
  }
  tablo += '<td>les 4</td></tr><tr><td><span>&#9858;</span> 5</td>';
  for (i=1; i<=nbJoueurs; i++) {
    tablo += '<td onclick="verifRayer(this)"><input class="j' + i + ' part1" onChange="calcul(this.class)" type="text"></td>';
  }
  tablo += '<td>les 5</td></tr><tr><td><span>&#9858;</span> 6</td>';
  for (i=1; i<=nbJoueurs; i++) {
    tablo += '<td onclick="verifRayer(this)"><input class="j' + i + ' part1" onChange="calcul(this.class)" type="text"></td>';
  }
  tablo += '<td>les 6</td></tr>';
  

  tablo += '<tr><td>Total partiel</td>';
  for (i=1; i<=nbJoueurs; i++) {
    tablo += '<td id="total1Joueur' + i + '"></td>';
  }
  tablo += '<td>TOTAL &#10112;</td></tr><tr><td>+ prime de 37 si total &ge; 63</td>';
  for (i=1; i<=nbJoueurs; i++) {
    tablo += '<td id="totalPrimeJoueur' + i + '"></td>';
  }
  tablo += '<td>Total &#10112; + PRIME éventuelle</td></tr><tr><td>BRELAN <br> 3 faces identiques</td>';
  for (i=1; i<=nbJoueurs; i++) {
    tablo += '<td onclick="verifRayer(this)"><input class="j' + i + ' part2" onChange="calcul()" type="text"></td>';
  }
  tablo += '<td>Les points des 5 dés</td></tr><tr><td>PETITE SUITE <br><span>&#9856; &#9857; &#9858; &#9859; &#9860;</span></td>';
  for (i=1; i<=nbJoueurs; i++) {
    tablo += '<td onclick="verifRayer(this)"><input class="j' + i + ' part2" type="checkbox" value="25" onChange="calcul()"></td>';
  }
  tablo += '<td>25</td></tr><tr><td>GRANDE SUITE <br><span>&#9857; &#9858; &#9859; &#9860; &#9861;</span></td>';
  for (i=1; i<=nbJoueurs; i++) {
    tablo += '<td onclick="verifRayer(this)"><input class="j' + i + ' part2" type="checkbox" value="25" onChange="calcul()"></td>';
  }
  tablo+= '<td>25</td></tr><tr><td>FULL <br> brelan + paire</td>';
  for (i=1; i<=nbJoueurs; i++) {
    tablo += '<td onclick="verifRayer(this)"><input class="j' + i + ' part2" type="checkbox" value="30" onChange="calcul()"></td>';
  }
  tablo += '<td>30</td></tr><tr><td>CARRE <br> 4 faces identiques</td>';
  for (i=1; i<=nbJoueurs; i++) {
    tablo += '<td onclick="verifRayer(this)"><input class="j' + i + ' part2" type="checkbox" value="40" onChange="calcul()"></td>';
  }
  tablo += '<td>40</td></tr><tr><td>YAM <br> 5 faces identiques</td>';
  for (i=1; i<=nbJoueurs; i++) {
    tablo += '<td onclick="verifRayer(this)"><input class="j' + i + ' part2" type="checkbox" value="50" onChange="calcul()"></td>';
  }
  tablo += '<td>50</td></tr><tr><td>TOTAL partiel</td>';
  for (i=1; i<=nbJoueurs; i++) {
    tablo += '<td id="total2Joueur' + i + '"></td>';
  }
  tablo += '<td>TOTAL &#10113;</td></tr><tr><td>TOTAL GENERAL</td>';
  for (i=1; i<=nbJoueurs; i++) {
    tablo += '<td id="generalJoueur' + i + '"></td>';
  }
  tablo += '<td>&#10112; + PRIME + &#10113;</td></tr></table>';

  document.getElementById("main").innerHTML = tablo;

}