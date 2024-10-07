function add(a,b){
    return a + b;
}

function subtract(a,b){
    return a - b;
}

function multiply(a,b){
    return a * b;
}

function divide(a,b){
    if(b===0){
        return alert(`You can't divide by 0`)
    }else{
        return a/b;
    }
}

function operate(operator,a,b){
    switch (operator) {
        case "+":
          return add(a, b);
        case "-":
          return subtract(a, b);
        case "x":
          return multiply(a, b);
        case "÷":
          return divide(a, b);
        default:
          throw new Error("Invalid operator");
      }
 }

document.addEventListener('DOMContentLoaded',function(){
    let buttons = document.querySelectorAll('button')
    let display = document.querySelector('.display')
    let currentNumber = ""
    let firstNumber = null
    let currentOperator =null

    buttons.forEach((button)=>{
        button.addEventListener('click',()=>{
            const buttonValue = button.textContent;

            if(!isNaN(buttonValue)||buttonValue==='.'){
                currentNumber += buttonValue;
                updateDisplay();
            }else if(buttonValue==='DEL'){
                display.textContent = display.textContent.slice(0,-1);
            }else if(buttonValue==='AC'){
                clearDisplay();
            }else if(buttonValue==='='){
                let result = operate(currentOperator,firstNumber,parseFloat(currentNumber));
                currentNumber= result.toString();
                firstNumber=null;
                currentOperator=null;
                updateDisplay();
            }else if(["+","-","x","÷"].includes(buttonValue)){
                if(currentOperator===null){
                    firstNumber = parseFloat(currentNumber);
                }else{
                    let result = operate(currentOperator,firstNumber,parseFloat(currentNumber));
                    currentNumber= result.toString();
                    firstNumber=result;
                    updateDisplay();
                }
                currentOperator=buttonValue;
                currentNumber="";
            }
        })
    })

    function updateDisplay() {
        if (firstNumber && currentOperator) {
            display.textContent = `${firstNumber} ${currentOperator} ${currentNumber}` || '0';
        } else {
            display.textContent = currentNumber || '0';
        }
    }

    function clearDisplay() {
        currentNumber = ""
        firstNumber = null
        currentOperator =null
        updateDisplay();
    }

})