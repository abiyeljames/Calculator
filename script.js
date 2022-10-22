let firstNum = false;
let secondNum = false;
let operationWasPerformed = 0;
let operator;

function getDisplay(){
	return document.getElementById("display").innerText;
}

function printDisplay(num){
	document.getElementById("display").innerText=num;
}

function operate(operator, paramA, paramB ) {
    let result = 0;
    paramA = parseFloat(paramA);
    paramB = parseFloat(paramB);
    switch(operator) {
        case '+' :
            result  = ((a, b) => {return a+b;})(paramA, paramB);
            break;
        case '-' : 
            result  = ((a, b) => {return a-b;})(paramA, paramB);
            break;
        case '*' :
            result  = ((a, b) => {return a*b;})(paramA, paramB);
            break;
        case '÷' :
            result  = ((a, b) => {return a/b;})(paramA, paramB);
            break;
    }
    operationWasPerformed = true;
    return result.toFixed(5);
}

function setOperator(op){
    operator = op;
    firstNum = getDisplay();
    if(secondNum == false){
        printDisplay(0);
    }
}

function enterNumber(number){
    if((number == 0) && (getDisplay() == 0)){
        return;
    }

    if(getDisplay() == "0"){
        printDisplay(number);
    }
    else{
        printDisplay((getDisplay())+number);
    }
}

function readyCheck(){
    let check = false;
    if(operator && firstNum && secondNum){
        if((secondNum==0) && (operator == "÷")){
            document.getElementById("clear").click();
            document.getElementById("error").innerText="Sorry, you can't divide by zero.";
        }
        else{
            check = true;
        }
    }
    return check;
}

[...document.getElementsByClassName('numbers')].forEach(number => {
    number.addEventListener('click', function() {
        document.getElementById("error").innerText="";

        if(operationWasPerformed){
            document.getElementById("display").innerText="";
            secondNum = false;
            operationWasPerformed = false;
        }

        enterNumber(number.value);
    })
  });

[...document.getElementsByClassName('operators')].forEach(op => {
    op.addEventListener('click', function() {
        document.getElementById("error").innerText="";
        if(firstNum && !operationWasPerformed){
            
            secondNum = getDisplay();
            console.log("operator before ready check", operator);
            if(readyCheck()){
                let result = operate(operator, firstNum, secondNum);
                printDisplay(result);
                setOperator(op.value);
            }
            else{
                alert("operator:"+operator+"firstNum:"+firstNum+"secondNum:"+secondNum);
            }
        }
        else{
            setOperator(op.value);
        }
    })
});

document.getElementById("equals").addEventListener('click', function(){
    document.getElementById("error").innerText="";
    secondNum = getDisplay();
    if(readyCheck()){
        let result = operate(operator, firstNum, secondNum);
        printDisplay(result);
        firstNum = result;
    }
    else{
        alert("operator:"+operator+"firstNum:"+firstNum+"secondNum:"+secondNum);
    }
});

document.getElementById("clear").addEventListener('click', function(){
    document.getElementById("error").innerText="";
    firstNum = false;
    secondNum = false;
    operator = false;
    printDisplay(0);
});

document.getElementById("decimal").addEventListener('click', function(){
    document.getElementById("error").innerText="";
    if(getDisplay().includes(".")){
        return;
    }
    else{
        printDisplay((getDisplay())+this.value);
    }
});

document.getElementById("backspace").addEventListener('click', function(){
    document.getElementById("error").innerText="";
    if(getDisplay() == 0){
        return;
    }
    else if(getDisplay().length == 1){
        printDisplay(0);
    }
    else{
        printDisplay(getDisplay().slice(0, -1));
    }
});