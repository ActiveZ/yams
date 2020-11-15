
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
    document.getElementById("total1Joueur"+ i).innerHTML = j.get_total_1() + " (" + j.get_delta_sum() + ")"
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

