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
        // console.log("joueur obj construct:", obj)
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

    ///////////////////////////// SET PART 1 /////////////////////////////////

    set_les_1(x) {
        // console.log("x:", x, "coherent: ", this.isCoherent(1,x))
        this.joueur.part_1.les_1 = this.isCoherent(1,x) ? x : null
        console.log("les1:", this.joueur.part_1.les_1)
        // return this.isCoherent(1,x)
    }

    set_les_2(x) {
        this.joueur.part_1.les_2 = this.isCoherent(2,x) ? x : null
        // if(this.isCoherent(2,x)) this.les_2 = x
        // return this.isCoherent(2,x)
    }

    set_les_3(x) {
        this.joueur.part_1.les_3 = this.isCoherent(3,x) ? x : null
        // if(this.isCoherent(3,x)) this.les_3 = x
        // return this.isCoherent(3,x)
    }    
    
    set_les_4(x) {
        this.joueur.part_1.les_4 = this.isCoherent(4,x) ? x : null
        // if(this.isCoherent(4,x)) this.les_4 = x
        // return this.isCoherent(4,x)
    }    
    
    set_les_5(x) {
        this.joueur.part_1.les_5= this.isCoherent(5,x) ? x : null
        // if(this.isCoherent(5,x)) this.les_5 = x
        // return this.isCoherent(5,x)
    }    
    
    set_les_6(x) {
        this.joueur.part_1.les_6 = this.isCoherent(6,x) ? x : null
        // if(this.isCoherent(6,x)) this.les_6 = x
        // return this.isCoherent(6,x)
    }

    ///////////////////////////// SET PART 2 /////////////////////////////////

    set_chance(x) {
        this.joueur.part_2.chance = (x > 4 && x < 31) ? x : null 
        // return (x > 4 && x < 31);
    }

    set_brelan(x) { // x = true/false
        this.joueur.part_2.brelan = x;
    }

    set_petite_suite(x) {
        this.joueur.part_2.petite_suite = x;
    }

    set_grande_suite(x) {
        this.joueur.part_2.grande_suite = x;
    }

    set_full(x) {
        this.joueur.part_2.full = x;
    }

    set_carre(x) {
        this.joueur.part_2.carre = x;
    }

    set_yams(x) {
        this.joueur.part_2.yams = x;
    }

    /////////////////////////////////////////

    get_brelan() {
        return this.joueur.part_2.brelan ? 15 : null;
    }

    get_petite_suite() {
        return this.joueur.part_2.petite_suite ? 20 : null;
    }

    get_grande_suite() {
        return this.joueur.part_2.grande_suite ? 30 : null;
    }

    get_full() {
        return this.joueur.part_2.full ? 30 : null;
    }

    get_carre() {
        return this.joueur.part_2.carre ? 40 : null;
    }

    get_yams() {
        return this.joueur.part_2.yams ? 50 : null;
    }
    ///////////////////////////// CALCULS ////////////////////////////////

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

    // vérifie la cohérence de la valeur en fonction de la combinaison de dé 
    isCoherent (combi, val) {
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


}