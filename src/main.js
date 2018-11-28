
class BigNumberOperations {

    constructor(a = '0', b = '0'){
        this.a = a.trim();
        this.b = b.trim();
    }

    /**
     * проверяет строку на соответствие условиям ТЗ
     * @param s
     * @returns {boolean}
     * @private
     */
    _checkNumber(s){
        //регулярное выражение: первый символ может быть "+" или "-", остальные только цифры
        let regExp = /^((\+|-)?)(\d+)$/g;
        return (s.length <= 64) && (regExp.test(s));
    }

    /**
     * определяет набольший операнд из 2х
     * @param first
     * @param second
     * @returns {number}
     * @private
     */
    _compare(first = this.a, second = this.b) {
        //убираем незначащие нули
        let a = first.replace(/^0+/,'');
        let b = second.replace(/^0+/,'');
        //определяем наибольший операнд
        if (a.length>b.length) return 1;
        if (a.length<b.length) return -1;
        for (let i=0; i<a.length; i++) {
            if(a[i]>b[i]) return 1;
            if(a[i]<b[i]) return -1;
        }
        return 0;
    }

    /**
     * реализация сложения больших чисел
     * @param first
     * @param second
     * @returns {*}
     * @private
     */
    _bigAdd(first = this.a, second = this.b) {
        //превращаем в строку
        let a = first + '';
        let b = second + '';
        //определяем знак
        let signa = a[0] === '-';
        let signb = b[0] === '-';
        a = a.replace(/^-/,'');
        b = b.replace(/^-/,'');
        if(signa && signb) {
            return '-' + this._bigAdd(a, b);
        }
        if(signa && !signb) {
            return this.bigSub(b, a);
        }
        if(!signa && signb) {
            return this.bigSub(a, b);
        }
        let res = '';
        let c = 0;
        a = [...a];
        b = [...b];
        while (a.length || b.length || c) {
            c += ~~a.pop() + ~~b.pop();
            res = c % 10 + res;
            c = c > 9;
        }
        return res.replace(/^0+/, '') || '0';
    }

    bigSub(first = this.a, second = this.b) {
        let a = first + '';
        let b = second + '';
        let signa = a[0] === '-';
        let signb = b[0] === '-';
        a = a.replace(/^-/,'').replace(/^0+/,'');
        b = b.replace(/^-/,'').replace(/^0+/,'');
        if (signa + signb == 1) {
            return (signa ? '-' : '') + this._bigAdd(a,b);
        }
        if (this._compare(a, b) == -1) {
            [a, b] = [b, a];
        }
        a = [...a];
        b = [...b];
        for (let i = a.length - 1; i >= 0; i--) {
            let c = b[b.length - a.length + i] || 0;
            a[i]=a[i]-c;
            if (a[i] < 0) {
                a[i] += 10;
                a[i - 1]--;
            }
        }
        a = a.join('').replace(/^0+/,'');
        if ((signa && this._compare(first, second) == 1) || (!signa && this._compare(first, second) == -1)) {
            a = '-' + a;
        }
        return a || '0';
    }

}

let bn = new BigNumberOperations();
//let subtract = bn.bigSub;
test(bn.bigSub("", ""), "0");

function test (a, b){
    console.log(a === b);
}