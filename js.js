var nbJoueurs=6;

function calcul() {
  for (let i = 1; i < nbJoueurs+1; i++) {
    let x = document.getElementsByClassName("j" + i + " part1");
    let y = document.getElementsByClassName("j" + i + " part2");
    let total1 = 0;
    
    for (let j = 0; j < x.length; j++) {
      // x[j].style.backgroundColor = "red";
      total1 += Number(x[j].value);
    }
    
    let total2 = Number(y[0].value); // valeur brelan
    for (let j = 1; j < y.length; j++) {
      if (y[j].checked) {
        total2 += Number(y[j].value);
      // total2 += Number(y[j].value);
      }
    }
    // total2 += Number(y.value);
    console.log(y);
    // console.log(y[0].value);

    document.getElementById("total1Joueur" + i).innerHTML = total1;
    if (total1 > 62) {total1 += 37}
    document.getElementById("totalPrimeJoueur" + i).innerHTML = total1;

    document.getElementById("total2Joueur" + i).innerHTML = total2;

    document.getElementById("generalJoueur" + i).innerHTML = total1 + total2;

  }
};