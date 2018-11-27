
class BigNumberOperations {

    constructor(a = '0', b = '0'){
        this.a = a.trim();
        this.b = b.trim();
    }

    checkNumber(s){
        let regExp = /^((\+|-)?)(\d+)$/g;
        return (s.length <= 64) && (regExp.test(s));
    }

}

let bn = new BigNumberOperations();
console.log(bn.checkNumber(''));