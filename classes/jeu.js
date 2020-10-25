class Jeu {

    joueurs = []

    get_nb_joueurs() {
        return this.joueurs.length;
    }

    get_joueur(id) {
        // console.log("id:", id, "j:", this.joueurs[id])
        return this.joueurs[id]
    }

    add_new_joueur(j) {
        this.joueurs.push(j.joueur)
    }

    game_save() {
        localStorage.setItem("yams", JSON.stringify(this.joueurs))
    }

    game_restore() {
        this.joueurs = JSON.parse(localStorage.getItem("yams"))
    }

    game_clear() {
        localStorage.removeItem("yams")
    }

    test() {
        console.log("test jeu: ok")
    }
}