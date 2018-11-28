/**
 * Класс обеспечивает операции большими числами.
 * Вычитание и умножение
 * Ревенков Кирилл
 */
class BigNumberOperations {

    constructor(a = '0', b = '0'){
        this.a = a.trim();
        this.b = b.trim();
    }

    /**
     * преобразование ввода в нужный для вычислений формат
     * @param first
     * @param second
     * @returns {*}
     * @private
     */
    _refactorInput(first, second) {
        //превращаем в строку
        let a = first + '';
        let b = second + '';
        //определяем знак
        let signa = a[0] === '-';
        let signb = b[0] === '-';
        //убираем символ знака, т.к. мы его уже учли
        a = a.replace(/^(-|\+)/,'');
        b = b.replace(/^(-|\+)/,'');
        return [a, b, signa, signb];
    }

    /**
     * определяет набольший операнд из 2х
     * @param first
     * @param second
     * @returns {number}
     * @private
     */
    _compare(first, second) {
        //убираем незначащие нули
        let a = String(first).replace(/^0+/,'');
        let b = String(second).replace(/^0+/,'');
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
    _add(first = this.a, second = this.b) {
        //проверяем ввод
        let inputArr = this._refactorInput(first, second);
        if (inputArr.length === 0) {
            return;
        }
        let [a, b, signa, signb] = inputArr;
        //определяем действие, которое нужно выполнить, в зависимости от знака операндов
        if(signa && signb) {
            return '-' + this._add(a, b);
        }
        if(signa && !signb) {
            return this.sub(b, a);
        }
        if(!signa && signb) {
            return this.sub(a, b);
        }
        //считаем сумму столбиком
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

    /**
     * вычитание больших чисел
     * @param first
     * @param second
     * @returns {*}
     */
    sub(first = this.a, second = this.b) {
        //проверяем ввод
        let inputArr = this._refactorInput(first, second);
        if (inputArr.length === 0) {
            return;
        }
        let [a, b, signa, signb] = inputArr;
        //если первый операнд отрицательный, а второй положительный, то считаем сумму и добавляем ей "-"
        //если первый положительный, а второй отрицательный, то возвращаем сумму
        if (signa + signb == 1) {
            return (signa ? '-' : '') + this._add(a,b);
        }
        //определяем порядок операндов
        if (this._compare(a, b) == -1) {
            [a, b] = [b, a];
        }
        //строка -> массив
        a = [...a];
        b = [...b];
        //вычитаем столбиком
        for (let i = a.length - 1; i >= 0; i--) {
            let c = b[b.length - a.length + i] || 0;
            a[i] = a[i] - c;
            if (a[i] < 0) {
                a[i] += 10;
                a[i - 1]--;
            }
        }
        //превращаем в строку
        a = a.join('').replace(/^0+/,'');
        //определяем знак результата
        if ((signa && this._compare(first, second) == 1) || (!signa && this._compare(first, second) == -1)) {
            a = '-' + a;
        }
        return a || '0';
    }

    /**
     * умножение больших чисел
     * @param first
     * @param second
     * @returns {string}
     */
    multiply(first = this.a, second = this.b){
        //проверяем ввод
        let inputArr = this._refactorInput(first, second);
        if (inputArr.length === 0) {
            return;
        }
        let [a, b, signa, signb] = inputArr;
        //определяем порядок операндов
        if (this._compare(a, b) == -1) {
            [a, b] = [b, a];
        }
        //строка -> массив
        a = [...a];
        b = [...b];
        //итоговый массив
        let res = '0';
        //умножаем в столбик
        for(let i = b.length - 1; i >= 0; i--) {
            //переполнение
            let overflow = 0;
            let _res = '';//промежуточные результаты
            //заполняем строки после первой нулями
            for (let k = b.length - 1 - i; k > 0; k--){
                _res = _res + '0';
            }
            //посимвольно умножаем
            for (let j = a.length - 1; j >= 0; j--) {
                overflow = overflow + (a[j] * b[i]);
                _res = overflow % 10 + _res;
                overflow = ~~(overflow/10);
            }
            _res = overflow + _res;
            res = this._add(res, _res);
        }
        //определяем знак выражения
        if (signa + signb == 1) {
            res = '-' + res;
        }
        return res;
    }

}