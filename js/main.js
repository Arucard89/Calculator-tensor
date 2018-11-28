let btn = document.getElementById('OKButton');
btn.onclick = (e) => {
    e.preventDefault();

    let firstElem = document.getElementById('firstNumber');
    let secondElem = document.getElementById('secondNumber');
    let firstVal = firstElem.value;
    let secondVal = secondElem.value;
    let goodInput = true;

    goodInput = goodInput && checkInput(firstElem);
    goodInput = goodInput && checkInput(secondElem);

    if (goodInput) {

    }

};


/**
 * проверка ввода на соответствие ТЗ
 * @param elem
 * @returns {boolean}
 */
function checkInput(elem){
    let goodInput = true;
    if (!checkNumber(elem.value)) {
        elem.classList.add('wrongInput');
        goodInput = false;
    } else {
        elem.classList.remove('wrongInput');
    }

    return goodInput;
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

