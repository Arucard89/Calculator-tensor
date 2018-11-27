
class BigNumberOperations {

    constructor(a = 0, b = 0){
        this.a = a;
        this.b = b;
    }

    checkNumber(s){
        let regExp = /^(\+|-)?[0-9]+/g;
        return (s.length > 64) && (regExp.test(s));
    }

}