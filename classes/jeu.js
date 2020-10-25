class Jeu {

    joueurs = [];

    constructor() {
        this.game_restore()
    }

    get_nb_joueurs() {
        console.log("get nb joueurs:", this.joueurs.length)
        return this.joueurs.length;
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

    test() {
        console.log("test:", this.joueurs)
    }
}