
/////////////// MAIN /////////////////////

let jeu = new Jeu()
// jeu.test()
jeu.game_clear()

let j1 = new Joueur()
j1.set_name("Arno")
let j2 = new Joueur()
j2.set_name("Fiona")

jeu.add_new_joueur(j1)
jeu.add_new_joueur(j2)
jeu.game_save()

jeu.game_restore()
let j = new Joueur (jeu.get_joueur(0))
console.log("nom:", j.get_name())
console.log("joueur:", j.get_joueur())

// j = new Joueur (jeu.get_joueur(1))
// console.log("nom:", j.get_name())
// console.log("joueur:", j.get_joueur())

console.log("total 1:",j.get_total_1())
console.log("total 1 + prime:",j.get_total_1_prime())
console.log("d:", j.get_delta(2))
j.get_delta_sum()
console.log("total 2:",j.get_total_2())
console.log("total 3:",j.get_total_3())
