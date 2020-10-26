class Jeu {

    joueurs = [];

    constructor() {
        this.game_restore()
    }

    get_nb_joueurs() {
        console.log("get nb joueurs:", this.joueurs.length)
        return this.joueurs.length;
    }

    update_nb_joueurs(n) {
        console.log("update nb joueur:", n)
        this.joueurs = []
        this.game_clear()
        for (let i = 0; i < n; i++) {
            let j = new Joueur
            j.set_name("joueur " + (i + 1))
            this.joueurs.push(j.joueur)
        }
        this.game_save()
    }

    get_joueur(id) {
        console.log("id:", id, "j:", this.joueurs[id])
        return this.joueurs[id]
    }

    add_new_joueur(j) {
        console.log("add:", j.joueur)
        this.joueurs.push(j.joueur)
    }

    game_save() {
        localStorage.setItem("yams", JSON.stringify(this.joueurs))
    }

    game_restore() {
        this.joueurs = JSON.parse(localStorage.getItem("yams"))
        console.log("restore joueurs:", this.joueurs)
        console.log("restore:", this.joueurs != null) // retourne true si restauration ok, sinon créer un jeu
        if (this.joueurs == null) {
            console.log("création d'un jeu")
            this.joueurs = []
            let j1 = new Joueur
            j1.set_name("joueur 1")
            this.joueurs.push(j1.joueur)
            let j2 = new Joueur
            j2.set_name("joueur 2")
            this.joueurs.push(j2.joueur)
            this.game_save()
        }
    }

    game_clear() {
        localStorage.removeItem("yams")
    }

    game_replay() { // nouvelle partie avec les mêmes joueurs
        console.log("replay")
        let new_joueurs = []
        for (let i = 0; i < this.get_nb_joueurs(); i++) {
            let j = new Joueur
            j.set_name(this.joueurs[i].name)
            console.log("replay name:", this.joueurs[i].name)
            new_joueurs.push(j.joueur)
        }
        this.joueurs = new_joueurs
        this.game_save()
    }

    display() {
        let nbJoueurs = this.get_nb_joueurs();
        let tablo="";
        let i;
        console.log("display")
        tablo = '<table>';
        
        tablo += '<thead>';
            
            tablo += '<tr><th>COMBINAISONS</th><th colspan="' + nbJoueurs + '">NOMS DES JOUEURS</th><th>MARQUE</th></tr>';
            
            tablo += '<tr><td></td>';
            for (i=1; i<=nbJoueurs; i++) {
                tablo += '<td><input class="nomJoueur" value="' + this.joueurs[i-1].name + '"></td>';
            }
            tablo += '<td></td></tr>';
        
        tablo += '</thead>';
        
        // les 1
        tablo += '<tr><td><span>&#9856;</span> 1</td>';
        for (i=1; i<=nbJoueurs; i++) {
            tablo += '<td onclick="verifRayer(this)"><input class="j' + i +' part1" onChange="calcul(this.class)" type="text"></td>';
            // tablo += '<td onclick="verifRayer(this)"><input class="j' + i +' part1" onChange="calcul(this.class)" type="text"></td>';
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
        
        return tablo;
    }


    //////////////////////////////////////////////////////////////////

    test() {
        console.log("test:", this.joueurs)
    }
}