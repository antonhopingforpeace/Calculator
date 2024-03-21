const add = function(a,b){this.textContent
    return a+b;
}

const subtract = function(a,b){
    return a-b;
}

const multiply = function(a,b){
    return a*b;
}

const divide = function(a,b){
    return a/b;
}

const operate = function(num1,op,num2){
    num1=Number(num1);
    num2=Number(num2);
    if(op=="+"){
        return add(num1,num2);
    }
    else if(op=="-"){
        return subtract(num1,num2);
    }
    else if(op=="*"){
        return multiply(num1,num2);
    }
    else if(op=="/"){
        return divide(num1,num2);
    }
}


const displayScreen= document.getElementById("display");
const hiddenScreen= document.getElementById("hidden-display");

const clearKey = document.querySelector(".clear")

const addKey = document.querySelector(".add");
const subtractKey = document.querySelector(".subtract");
const multiplyKey = document.querySelector(".multiply");
const divideKey = document.querySelector(".division");

const numberKeys = document.getElementsByClassName("number");

const equalKey = document.querySelector(".result");

function calculateResult(){
    if(hiddenScreen.value==""){
        return;
    }
    else{
        let op = hiddenScreen.value.substr(-1);
        let numberOne = hiddenScreen.value.slice(0,hiddenScreen.value.length-1);
        let numberTwo = displayScreen.value;
        displayScreen.value = operate(numberOne,op,numberTwo);
        hiddenScreen.value="";
        return displayScreen.value;
    }
}

function clearScreen(){
    displayScreen.value=0;
    hiddenScreen.value="";
}

let hiddenFlag=false;

function addCalc(){

    let digit = this.textContent;
    let val=displayScreen.value;
    
    if(val.length<15){

        let hiddenFLag=false;

        if(val==0 && digit!="+" && digit!="-" && digit!="*" && digit!="/"){
            val=digit;
        }
        else if(val==0 && (digit=="+" || digit=="-" || digit=="*" || digit=="/")){
            return;
        }
        else if(digit=="+" || digit=="-" || digit=="*" || digit=="/"){
            if(hiddenScreen.value==""){
                hiddenScreen.value=val+digit;
                val="";
            }
            else if(hiddenScreen.value!=""){
                flag=true;
                val = calculateResult();
                hiddenScreen.value = val+digit;
            }
            
        }
        else{
            if(flag){
                val=digit;
                flag=false;
            }
            else{
            val+=digit;
            }
        }
    }

    displayScreen.value=val;
}



clearKey.addEventListener("click",clearScreen);

for(let i=0;i<numberKeys.length;i++){
    numberKeys[i].addEventListener("click",addCalc);
}

const arrOfCalc = [addKey,subtractKey,multiplyKey,divideKey];
for(let i=0;i<arrOfCalc.length;i++){
    arrOfCalc[i].addEventListener("click",addCalc);
}


equalKey.addEventListener("click",calculateResult);
