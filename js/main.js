let btn = document.getElementById('OKButton');

/**
 * обработчик нажатия кнопки
 * @param e
 */
btn.onclick = (e) => {
    e.preventDefault();
    //получаем значения ввода
    let firstElem = document.getElementById('firstNumber');
    let secondElem = document.getElementById('secondNumber');
    let firstVal = firstElem.value;
    let secondVal = secondElem.value;
    //флаг правильного ввода
    let goodInput = true;
    //проверяем ввод
    goodInput = checkInput(firstElem) && goodInput;
    goodInput = checkInput(secondElem) && goodInput;
    //если все хорошо, то выполняем выбранную операцию
    if (goodInput) {
        let operation = document.getElementById('operationSign');
        let bigNum = new BigNumberOperations(firstVal, secondVal);
        let res = document.getElementById('result');
        switch (operation.value){
            case '-':
                res.value = bigNum.sub();
                break;
            case '*':
                //асинхронно, чтобы не задерживало окно
                setTimeout(() => {
                    res.value = bigNum.multiply();
                }, 0);
                break;
            default:
                alert("Возникла непредвиденная ошибка. Перезагрузите, пожалуйста страницу.")
        }
    } else {
        alert("Неверно заполнены выделенные красным поля. Исправьте, пожалуйста, ошибку и попробуйте снова.");
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