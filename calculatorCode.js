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
    if(op==="+"){
        return add(num1,num2);
    }
    else if(op==="-"){
        return subtract(num1,num2);
    }
    else if(op==="*"){
        return multiply(num1,num2);
    }
    else if(op==="/"){
        return divide(num1,num2);
    }
}


const displayScreen= document.getElementById("display");
const clearKey = document.querySelector(".clear")
const deleteKey = document.querySelector(".delete");
const addKey = document.querySelector(".add");
const subtractKey = document.querySelector(".subtract");
const multiplyKey = document.querySelector(".multiply");
const divideKey = document.querySelector(".division");
const numberKeys = document.getElementsByClassName("number");
const equalKey = document.querySelector(".result");

let screen=displayScreen.value;

function clearScreen(){
    displayScreen.value=0;
    screen=displayScreen.value;
}

function addCalc(){
    let digit = this.textContent;
    let val=displayScreen.value;
    if(val==0){
        val=digit;
    }
    else if((val[val.length-1]=="+"||val[val.length-1]=="*"||val[val.length-1]=="/"||val[val.length-1]=="-")
            &&(digit=="+"||digit=="-"||digit=="*"||digit=="/")){
        return;
    }
    else{
        val+=digit;
    }

    displayScreen.value=val;
    screen=displayScreen.value;
}

function deleteCalc(){
    const len = displayScreen.value.length;
    displayScreen.value=displayScreen.value.slice(0,len-1);
    if(displayScreen.value==""){
        displayScreen.value=0;
    }
    screen=displayScreen.value;
}

function calculateResult(){
    
}

clearKey.addEventListener("click",clearScreen);

for(let i=0;i<numberKeys.length;i++){
    numberKeys[i].addEventListener("click",addCalc);
}

const arrOfCalc = [addKey,subtractKey,multiplyKey,divideKey];
for(let i=0;i<arrOfCalc.length;i++){
    arrOfCalc[i].addEventListener("click",addCalc);
}

deleteKey.addEventListener("click",deleteCalc);

equalKey.addEventListener("click",calculateResult);
