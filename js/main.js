/**
 * Выполнение тестового задания
 * Ссылка на задание: https://github.com/Arucard89/Calculator-tensor/blob/master/Task.pdf
 */

//инициализируем основные переменные
let bigNum = new BigNumberOperations(); //подключаем класс с арифметикой
let btn = document.getElementById('OKButton'); //кнопка ОК""
let firstElem = document.getElementById('firstNumber'); //первый операнд
let secondElem = document.getElementById('secondNumber'); //второй операнд
let res = document.getElementById('result'); //поле результата

firstElem.onchange = secondElem.onchange = function (e) {
   checkInput(this);
   res.value = "";
};
/**
 * обработчик нажатия кнопки
 * @param e
 */
btn.onclick = (e) => {
   e.preventDefault();
   //получаем значения ввода

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
      switch (operation.value) {
         case '-':
            res.value = bigNum.sub(firstVal, secondVal);
            break;
         case '*':
            //асинхронно, чтобы не задерживало окно
            setTimeout(() => {
               res.value = bigNum.multiply(firstVal, secondVal);
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
 * проверка ввода на соответствие условиям задания
 * @param elem
 * @returns {boolean}
 */
function checkInput(elem) {
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
 * проверяет строку на соответствие условиям задания
 * @param s
 * @returns {boolean}
 * @private
 */
function checkNumber(s) {
   s = s + '';
   //регулярное выражение: первый символ может быть "+" или "-", остальные только цифры
   let regExp = /^((\+|-)?)(\d+)$/g;
   return (s.length <= 64) && (regExp.test(s));
}