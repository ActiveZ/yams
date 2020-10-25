class Joueur {
// class Joueur {

    // joueur = {
    //     name: null,
    //     part_1: {
    //         les_1: null,
    //         les_2: 8,
    //         les_3: null,
    //         les_4: 12,
    //         les_5: 10,
    //         les_6: 36
    //     },
    //     part_2: {
    //         chance: 21,
    //         brelan: false,
    //         petite_suite: false,
    //         grande_suite: false,
    //         full: false,
    //         carre: false,
    //         yams: true
    //     }
    // };

    joueur = {
        name: null,
        part_1: {
            les_1: null,
            les_2: null,
            les_3: null,
            les_4: null,
            les_5: null,
            les_6: null
        },
        part_2: {
            chance: null,
            brelan: false,
            petite_suite: false,
            grande_suite: false,
            full: false,
            carre: false,
            yams: false
        }
    };

    constructor(obj = null) {
        console.log("obj construct:", obj)
        if (obj != null) this.joueur = obj
    }

    get_name() {
        console.log("get_name:", this.joueur.name )
        return this.joueur.name
    }

    set_name(new_name) {
        this.joueur.name = new_name
    }

    get_joueur() {
        console.log("get_joueur:", this.joueur)
        return this.joueur
    }

    set_joueur(new_joueur) {
        this.joueur = new_joueur
    }

    get_total_1() {
        let a = this.joueur.part_1;
        let sum = 0;
        for (const key in a) {
            // console.log(key,":", a[key]);
            sum += a[key];
        }
        return sum
    }

    get_total_1_prime() {
        let sum = this.get_total_1()
        sum += this.get_total_1() > 62 ? 37 : 0
        return  sum
    }

    get_delta(x) {
        let a = this.joueur.part_1
        let val = Object.values(a)[x-1]
        return Number.isInteger(val) ? val - (x * 3) : null
    }

    get_delta_sum() {
        let sum = null
        for (let i=1; i<7; i++) {
            sum += this.get_delta(i)
        }
        // console.log("d_sum:",sum)
        return sum
    }

    get_total_2() {
        let a = this.joueur.part_2
        let sum = null
        sum += a.chance
        sum += a.brelan ? 15:null
        sum += a.petite_suite ? 20:null
        sum += a.grande_suite ? 30:null
        sum += a.full ? 30:null
        sum += a.carre ? 40:null
        sum += a.yams ? 50:null
        // console.log("tot2:", sum)
        return sum
    }

    get_total_3() {
        let sum = null
        sum += this.get_total_1_prime() + this.get_total_2()
        return sum
    }
}