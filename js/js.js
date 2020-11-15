
//// poo ////
let jeu = new Jeu
// jeu.test()
// let j = new Joueur(jeu.get_joueur(0))
// j.get_joueur()
document.getElementById("inNbJoueur").value = jeu.get_nb_joueurs()
document.getElementById("main").innerHTML = jeu.display()
update_display()

///////////////////////

let nbJoueurs = jeu.get_nb_joueurs();
// init(nbJoueurs); // init avec 2 joueurs
var bRayer = false;
var bCancelRayer = false;
// var gameover = false;


/////////////////////////////////////////////////////////////////////
///////////////////////// BT REJOUER ////////////////////////////////
/////////////////////////////////////////////////////////////////////

document.getElementById("btRejouer").onclick =function () {
  if (!confirm("Voulez-vous supprimer la partie en cours ?")) return
  bRayer = false;
  bCancelRayer = false;
  document.getElementById("btRayer").innerHTML = "Rayer";
  document.getElementById("btRayer").style.backgroundColor = "white";
  // jeu.game_clear() //poo: non car il faut conserver les joueurs, nombre et noms
  jeu.game_replay()
  document.getElementById("main").innerHTML = jeu.display()

  // for (let i = 1; i <= nbJoueurs; i++) {
  //   let x = document.getElementsByClassName("j" + i + " part1");
  //   let y = document.getElementsByClassName("j" + i + " part2");

  //   for (let j = 0; j < x.length; j++) {
  //     x[j].value = ""; // annulation des combinaisons
  //     x[j].style.backgroundColor = "white";
  //     x[j].style.visibility = "visible";
  //    }

  //    y[0].value = "" ; // annulation des brelans
  //    x[0].style.visibility = "visible";

  //   for (let j = 1; j < y.length; j++) {
  //   y[j].checked = false; // annulation des cac
  //   y[j].style.visibility = "visible";
  //   }

  //   document.getElementById("total1Joueur" + i).innerHTML = "";
  //   document.getElementById("totalPrimeJoueur" + i).innerHTML = "";
  //   document.getElementById("total2Joueur" + i).innerHTML = "";
  //   document.getElementById("generalJoueur" + i).innerHTML = "";
  // }
}

/////////////////////////////////////////////////////////////////////
///////////////////////// UPDATE NB JOUEURS /////////////////////////
/////////////////////////////////////////////////////////////////////

document.getElementById("inNbJoueur").onchange =function () {
  jeu.update_nb_joueurs(this.value)
  document.getElementById("main").innerHTML = jeu.display()
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
function verifRayer(element) { ///////////////  INUTILISE !!!!!!!!!!! TODO: faire avec visibility 
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
  // else calcul(); // a virer !!! quand j'aurai compris comment :)
  else {
    console.log("cac:", element)
    update_element(0,"",0)
  }
}


/**************************************************************************/
 
function update_element (id, elt, val) { // en cours !!!!
  val = Number(val) // car le input renvoie du texte (normal, type="text") !
  /////////////////////
  // mettre des input number resoudrait les pb de cohérence et de saisie grace aux step et min/max !
  // mais pb de css pour faire disparaitre les fleche (le faut-il ?)
  /////////////////////
  let j = new Joueur (jeu.get_joueur(id-1))
  console.log("update:", id,elt,val)
  switch (elt) {
    case "les_1":
      j.set_les_1(val)
      break;
    case "les_2":
      j.set_les_2(val)
      break;
    case "les_3":
      j.set_les_3(val)
      break;
    case "les_4":
      j.set_les_4(val)
      break;
    case "les_5":
      j.set_les_5(val)
      break;
    case "les_6":
      j.set_les_6(val)
      break;
    case "chance":
      j.set_chance(val)
      break;
    case "brelan":
      j.set_brelan()
      break;
    case "petite_suite":
      j.set_petite_suite()
      break;    
    case "grande_suite":
      j.set_grande_suite()
      break;    
    case "full":
      j.set_full()
      break;    
    case "carre":
      j.set_carre()
      break;  
    case "yams":
      j.set_yams()
      break;
  default:
  }


  //faire update display avec les nouvelles valeurs en faisant game save puis game load
  // ce qui permet de sauver à chaque tour
  // et reset de la case du tableau si valeur incoherente

  // TODO: delta 
  
  console.log("tot 1: ", j.get_total_1())
  console.log("tot 2: ", j.get_total_2())
  jeu.game_save()
  jeu.game_restore()
  update_display()

}

function update_display() {
  console.log("jeu:", jeu)
  for (i = 1; i <= jeu.get_nb_joueurs(); i++) {
    let j = new Joueur(jeu.get_joueur(i-1))
    // j.set_les_1(5)
    console.log("jj:", j.joueur)
    document.getElementById("les_1_j"+ i).value = j.joueur.part_1.les_1
    document.getElementById("les_2_j"+ i).value = j.joueur.part_1.les_2
    document.getElementById("les_3_j"+ i).value = j.joueur.part_1.les_3
    document.getElementById("les_4_j"+ i).value = j.joueur.part_1.les_4
    document.getElementById("les_5_j"+ i).value = j.joueur.part_1.les_5
    document.getElementById("les_6_j"+ i).value = j.joueur.part_1.les_6
    document.getElementById("total1Joueur"+ i).innerHTML = j.get_total_1()
    document.getElementById("totalPrimeJoueur"+ i).innerHTML = j.get_total_1_prime()

    document.getElementById("chance_j"+ i).value = j.joueur.part_2.chance
    document.getElementById("brelan_j"+ i).checked = j.joueur.part_2.brelan
    document.getElementById("petite_suite_j"+ i).checked = j.joueur.part_2.petite_suite
    document.getElementById("grande_suite_j"+ i).checked = j.joueur.part_2.grande_suite
    document.getElementById("full_j"+ i).checked = j.joueur.part_2.full
    document.getElementById("carre_j"+ i).checked = j.joueur.part_2.carre
    document.getElementById("yams_j"+ i).checked = j.joueur.part_2.yams

    document.getElementById("total2Joueur"+ i).innerHTML = j.get_total_2()
    document.getElementById("generalJoueur"+ i).innerHTML = j.get_total_3()
  }
}

function calcul() {
  return
  for (let i = 1; i <= nbJoueurs; i++) {
    let x = document.getElementsByClassName("j" + i + " part1");
    let y = document.getElementsByClassName("j" + i + " part2");
    let total1 = 0;
    let delta = 0; // écart/prime
    
    for (let j = 0; j < x.length; j++) {
      //console.log("j: " + j + "  val: " + x[j].value);
      if (!isNaN(Number(x[j].value)) && x[j].value != "") { // doublon avec isCoherent
        if (!jeu.isCoherent(j+1, Number(x[j].value))) {
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

// function init(n) {
//   nbJoueurs = n;
//   gameover = false;
//   let tablo="";
//   let i;

//   tablo = '<table>';
  
//   tablo += '<thead>';
    
//     tablo += '<tr><th>COMBINAISONS</th><th colspan="' + nbJoueurs + '">NOMS DES JOUEURS</th><th>MARQUE</th></tr>';
    
//     tablo += '<tr><td></td>';
//     for (i=1; i<=nbJoueurs; i++) {
//       tablo += '<td><input class="nomJoueur" value="Joueur' + i + '"></td>';
//     }
//     tablo += '<td></td></tr>';

//   tablo += '</thead>';

//   // les 1
//   tablo += '<tr><td><span>&#9856;</span> 1</td>';
//   for (i=1; i<=nbJoueurs; i++) {
//     tablo += '<td onclick="verifRayer(this)"><input class="j' + i +' part1" onChange="calcul(this.class)" type="text"></td>';
//     // tablo += '<td onclick="verifRayer(this)"><input class="j' + i +' part1" onChange="calcul(this.class)" type="text"></td>';
//   }
//   tablo += '<td>les as</td></tr>';
  
//   // les 2
//   tablo += '<tr><td><span>&#9857;</span> 2</td>';
//   for (i=1; i<=nbJoueurs; i++) {
//     tablo += '<td onclick="verifRayer(this)"><input class="j' + i + ' part1" onChange="calcul(this.class)" type="text"></td>';
//   }
//   tablo += '<td>les 2</td></tr>';
  
//   // les 3
//   tablo += '<tr><td><span>&#9858;</span> 3</td>';
//   for (i=1; i<=nbJoueurs; i++) {
//     tablo += '<td onclick="verifRayer(this)"><input class="j' + i + ' part1" onChange="calcul(this.class)" type="text"></td>';
//   }
//   tablo += '<td>les 3</td></tr>';
  
//   //les 4
//   tablo += '<tr><td><span>&#9858;</span> 4</td>';
//   for (i=1; i<=nbJoueurs; i++) {
//     tablo += '<td onclick="verifRayer(this)"><input class="j' + i + ' part1" onChange="calcul(this.class)" type="text"></td>';
//   }
//   tablo += '<td>les 4</td></tr>';
  
//   //les 5
//   tablo += '<tr><td><span>&#9858;</span> 5</td>';
//   for (i=1; i<=nbJoueurs; i++) {
//     tablo += '<td onclick="verifRayer(this)"><input class="j' + i + ' part1" onChange="calcul(this.class)" type="text"></td>';
//   }
//   tablo += '<td>les 5</td></tr>';
  
//   //les 6
//   tablo += '<tr><td><span>&#9858;</span> 6</td>';
//   for (i=1; i<=nbJoueurs; i++) {
//     tablo += '<td onclick="verifRayer(this)"><input class="j' + i + ' part1" onChange="calcul(this.class)" type="text"></td>';
//   }
//   tablo += '<td>les 6</td></tr>';
  
// // TOTAL 1

//   tablo += '<tr><td>Total partiel</td>';
//   for (i=1; i<=nbJoueurs; i++) {
//     tablo += '<td id="total1Joueur' + i + '"></td>';
//   }
//   tablo += '<td>TOTAL &#10112;</td></tr><tr><td>+ prime de 37 si total &ge; 63</td>';
//   for (i=1; i<=nbJoueurs; i++) {
//     tablo += '<td id="totalPrimeJoueur' + i + '"></td>';
//   }
//   tablo += '<td>Total &#10112; + PRIME éventuelle</td></tr>';

//   /////////////////////////////////// PARTIE 2 /////////////////////////////////////

//   //chance
//   tablo += '<tr><td>CHANCE</td>';
//   for (i=1; i<=nbJoueurs; i++) {
//     tablo += '<td onclick="verifRayer(this)"><input class="j' + i + ' part2" onChange="calcul(this.class)" type="text"></td>';
//   }
//   tablo += '<td>La somme des 5 dés</td></tr>';

//   //brelan
//   tablo += '<tr><td>BRELAN <br> 3 faces identiques</td>';
//   for (i=1; i<=nbJoueurs; i++) {
//     tablo += '<td onclick="verifRayer(this)"><input class="j' + i + ' part2" type="checkbox" value="15" onChange="verifRayer(this)"></td>';
//   }
//   tablo += '<td>15</td></tr>';

//   //petite suite
//   tablo += '<tr><td>PETITE SUITE <br>4 dés</td>';
//   for (i=1; i<=nbJoueurs; i++) {
//     tablo += '<td onclick="verifRayer(this)"><input class="j' + i + ' part2" type="checkbox" value="20" onChange="verifRayer(this)"></td>';
//   }
//   tablo += '<td>20</td></tr>';

//   //grande suite
//   tablo += '<tr><td>GRANDE SUITE <br>5 dés</td>';
//   for (i=1; i<=nbJoueurs; i++) {
//     tablo += '<td onclick="verifRayer(this)"><input class="j' + i + ' part2" type="checkbox" value="30" onChange="verifRayer(this)"></td>';
//   }
//   tablo+= '<td>30</td></tr>';
  
//   //full
//   tablo += '<tr><td>FULL <br> brelan + paire</td>';
//   for (i=1; i<=nbJoueurs; i++) {
//     tablo += '<td onclick="verifRayer(this)"><input class="j' + i + ' part2" type="checkbox" value="30" onChange="verifRayer(this)"></td>';
//   }
//   tablo += '<td>30</td></tr>';
  
//   //carré
//   tablo += '<tr><td>CARRE <br> 4 faces identiques</td>';
//   for (i=1; i<=nbJoueurs; i++) {
//     tablo += '<td onclick="verifRayer(this)"><input class="j' + i + ' part2" type="checkbox" value="40" onChange="verifRayer(this)"></td>';
//   }
//   tablo += '<td>40</td></tr>';
  
//   //yam
//   tablo += '<tr><td>YAM <br> 5 faces identiques</td>';
//   for (i=1; i<=nbJoueurs; i++) {
//     tablo += '<td onclick="verifRayer(this)"><input class="j' + i + ' part2" type="checkbox" value="50" onChange="verifRayer(this)"></td>';
//   }
//   tablo += '<td>50</td></tr>';
  
// // TOTAL 2

//   tablo += '<tr><td>TOTAL partiel</td>';
//   for (i=1; i<=nbJoueurs; i++) {
//     tablo += '<td id="total2Joueur' + i + '"></td>';
//   }
//   tablo += '<td>TOTAL &#10113;</td></tr>';
  
// // TOTAL GENERAL

//   tablo += '<tr><td>TOTAL GENERAL</td>';
//   for (i=1; i<=nbJoueurs; i++) {
//     tablo += '<td id="generalJoueur' + i + '"></td>';
//   }
//   tablo += '<td>&#10112; + PRIME + &#10113;</td></tr>';
  
//   tablo += '</table>';

//   document.getElementById("main").innerHTML = tablo;

// }

// function initOld(n) {
//   nbJoueurs = n;
//   gameover = false;
//   let tablo="";
//   let i;

//   tablo = '<table>';
  
//   tablo += '<thead>';
    
//     tablo += '<tr><th>COMBINAISONS</th><th colspan="' + nbJoueurs + '">NOMS DES JOUEURS</th><th>MARQUE</th></tr>';
    
//     tablo += '<tr><td></td>';
//     for (i=1; i<=nbJoueurs; i++) {
//       tablo += '<td><input class="nomJoueur" value="Joueur' + i + '"></td>';
//     }
//     tablo += '<td></td></tr>';

//   tablo += '</thead>';

//   // les 1
//   tablo += '<tr><td><span>&#9856;</span> 1</td>';
//   for (i=1; i<=nbJoueurs; i++) {
//     tablo += '<td onclick="verifRayer(this)"><input class="j' + i +' part1" onChange="calcul(this.class)" type="text"></td>';
//   }
//   tablo += '<td>les as</td></tr>';
  
//   // les 2
//   tablo += '<tr><td><span>&#9857;</span> 2</td>';
//   for (i=1; i<=nbJoueurs; i++) {
//     tablo += '<td onclick="verifRayer(this)"><input class="j' + i + ' part1" onChange="calcul(this.class)" type="text"></td>';
//   }
//   tablo += '<td>les 2</td></tr>';
  
//   // les 3
//   tablo += '<tr><td><span>&#9858;</span> 3</td>';
//   for (i=1; i<=nbJoueurs; i++) {
//     tablo += '<td onclick="verifRayer(this)"><input class="j' + i + ' part1" onChange="calcul(this.class)" type="text"></td>';
//   }
//   tablo += '<td>les 3</td></tr>';
  
//   //les 4
//   tablo += '<tr><td><span>&#9858;</span> 4</td>';
//   for (i=1; i<=nbJoueurs; i++) {
//     tablo += '<td onclick="verifRayer(this)"><input class="j' + i + ' part1" onChange="calcul(this.class)" type="text"></td>';
//   }
//   tablo += '<td>les 4</td></tr>';
  
//   //les 5
//   tablo += '<tr><td><span>&#9858;</span> 5</td>';
//   for (i=1; i<=nbJoueurs; i++) {
//     tablo += '<td onclick="verifRayer(this)"><input class="j' + i + ' part1" onChange="calcul(this.class)" type="text"></td>';
//   }
//   tablo += '<td>les 5</td></tr>';
  
//   //les 6
//   tablo += '<tr><td><span>&#9858;</span> 6</td>';
//   for (i=1; i<=nbJoueurs; i++) {
//     tablo += '<td onclick="verifRayer(this)"><input class="j' + i + ' part1" onChange="calcul(this.class)" type="text"></td>';
//   }
//   tablo += '<td>les 6</td></tr>';
  
// // TOTAL 1

//   tablo += '<tr><td>Total partiel</td>';
//   for (i=1; i<=nbJoueurs; i++) {
//     tablo += '<td id="total1Joueur' + i + '"></td>';
//   }
//   tablo += '<td>TOTAL &#10112;</td></tr><tr><td>+ prime de 37 si total &ge; 63</td>';
//   for (i=1; i<=nbJoueurs; i++) {
//     tablo += '<td id="totalPrimeJoueur' + i + '"></td>';
//   }
//   tablo += '<td>Total &#10112; + PRIME éventuelle</td></tr>';

//   /////////////////////////////////// PARTIE 2 /////////////////////////////////////

//   //chance
//   tablo += '<tr><td>CHANCE</td>';
//   for (i=1; i<=nbJoueurs; i++) {
//     tablo += '<td onclick="verifRayer(this)"><input class="j' + i + ' part2" onChange="calcul(this.class)" type="text"></td>';
//   }
//   tablo += '<td>La somme des 5 dés</td></tr>';

//   //brelan
//   tablo += '<tr><td>BRELAN <br> 3 faces identiques</td>';
//   for (i=1; i<=nbJoueurs; i++) {
//     tablo += '<td onclick="verifRayer(this)"><input class="j' + i + ' part2" type="checkbox" value="15" onChange="verifRayer(this)"></td>';
//   }
//   tablo += '<td>15</td></tr>';

//   //petite suite
//   tablo += '<tr><td>PETITE SUITE <br>4 dés</td>';
//   for (i=1; i<=nbJoueurs; i++) {
//     tablo += '<td onclick="verifRayer(this)"><input class="j' + i + ' part2" type="checkbox" value="20" onChange="verifRayer(this)"></td>';
//   }
//   tablo += '<td>20</td></tr>';

//   //grande suite
//   tablo += '<tr><td>GRANDE SUITE <br>5 dés</td>';
//   for (i=1; i<=nbJoueurs; i++) {
//     tablo += '<td onclick="verifRayer(this)"><input class="j' + i + ' part2" type="checkbox" value="30" onChange="verifRayer(this)"></td>';
//   }
//   tablo+= '<td>30</td></tr>';
  
//   //full
//   tablo += '<tr><td>FULL <br> brelan + paire</td>';
//   for (i=1; i<=nbJoueurs; i++) {
//     tablo += '<td onclick="verifRayer(this)"><input class="j' + i + ' part2" type="checkbox" value="30" onChange="verifRayer(this)"></td>';
//   }
//   tablo += '<td>30</td></tr>';
  
//   //carré
//   tablo += '<tr><td>CARRE <br> 4 faces identiques</td>';
//   for (i=1; i<=nbJoueurs; i++) {
//     tablo += '<td onclick="verifRayer(this)"><input class="j' + i + ' part2" type="checkbox" value="40" onChange="verifRayer(this)"></td>';
//   }
//   tablo += '<td>40</td></tr>';
  
//   //yam
//   tablo += '<tr><td>YAM <br> 5 faces identiques</td>';
//   for (i=1; i<=nbJoueurs; i++) {
//     tablo += '<td onclick="verifRayer(this)"><input class="j' + i + ' part2" type="checkbox" value="50" onChange="verifRayer(this)"></td>';
//   }
//   tablo += '<td>50</td></tr>';
  
// // TOTAL 2

//   tablo += '<tr><td>TOTAL partiel</td>';
//   for (i=1; i<=nbJoueurs; i++) {
//     tablo += '<td id="total2Joueur' + i + '"></td>';
//   }
//   tablo += '<td>TOTAL &#10113;</td></tr>';
  
// // TOTAL GENERAL

//   tablo += '<tr><td>TOTAL GENERAL</td>';
//   for (i=1; i<=nbJoueurs; i++) {
//     tablo += '<td id="generalJoueur' + i + '"></td>';
//   }
//   tablo += '<td>&#10112; + PRIME + &#10113;</td></tr>';
  
//   tablo += '</table>';

//   document.getElementById("main").innerHTML = tablo;

// }