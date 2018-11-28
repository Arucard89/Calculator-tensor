let btn = document.getElementById('OKButton');
btn.onclick = (e) => {
    e.preventDefault();

    let firstElem = document.getElementById('firstNumber');
    let secondElem = document.getElementById('secondNumber');
    let firstVal = firstElem.value;
    let secondVal = secondElem.value;
    let goodInput = true;

    if (!checkNumber(firstVal)) {
        firstElem.classList.add('wrongInput');
        goodInput = false;
    } else {
        firstElem.classList.remove('wrongInput');
    }


    firstElem.classList.remove('wrongInput');
    secondElem.classList.remove('wrongInput');



};




/**
 * проверка ввода на соответствие ТЗ
 * @param first
 * @param second
 * @returns {number}
 */
function checkComplianceToTask(first, second){
    if (!checkNumber(first)) {
        return 1;
    }
    if (!checkNumber(second)) {
        return 2;
    }
    return 0;
}

/**
 * проверяет строку на соответствие условиям ТЗ
 * @param s
 * @returns {boolean}
 * @private
 */
function checkNumber(s){
    s = s + '';
    //регулярное выражение: первый символ может быть "+" или "-", остальные только цифры
    let regExp = /^((\+|-)?)(\d+)$/g;
    return (s.length <= 64) && (regExp.test(s));
}

