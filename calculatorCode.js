const add = function(a,b){this.textContent
    return (a+b).toFixed(5);
}

const subtract = function(a,b){
    return (a-b).toFixed(5);
}

const multiply = function(a,b){
    return (a*b).toFixed(5);
}

const divide = function(a,b){
    if(b==0){
        return "Can't divide by zero";
    }
    return (a/b).toFixed(5);
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
const deleteKey = document.querySelector(".delete");

const addKey = document.querySelector(".add");
const subtractKey = document.querySelector(".subtract");
const multiplyKey = document.querySelector(".multiply");
const divideKey = document.querySelector(".division");

const numberKeys = document.getElementsByClassName("number");
const decimalKey = document.querySelector(".decimal");

const equalKey = document.querySelector(".result");

function calculateResult(){
    if(hiddenScreen.value==""||hiddenScreen.value==" "||displayScreen.value[displayScreen.value.length-1]===" "){
        return;
    }
    else{
        let op = hiddenScreen.value.substr(-1);
        let numberOne = hiddenScreen.value.slice(0,hiddenScreen.value.length-1);
        let numberTwo = displayScreen.value;
        displayScreen.value = operate(numberOne,op,numberTwo);
        while(displayScreen.value[displayScreen.value.length-1]==0){
            displayScreen.value=displayScreen.value.slice(0,displayScreen.value.length-1);
        }
        if(displayScreen.value[displayScreen.value.length-1]=="."){
            displayScreen.value=displayScreen.value.slice(0,displayScreen.value.length-1);
        }
        hiddenScreen.value="";
        
        if(this.textContent=="="){
            hiddenScreen.value=" ";
        }

        if(displayScreen.value.length>13){
            if(displayScreen.value[displayScreen.value.length-4]=="e"||displayScreen.value[displayScreen.value.length-3]=="e"){
                let placeOfE= displayScreen.value.indexOf("e");
                displayScreen.value = displayScreen.value.slice(0,13-displayScreen.value.slice(placeOfE).length)+displayScreen.value.slice(placeOfE)
            }
            else{
                displayScreen.value = displayScreen.value.slice(0,13);
            }
        }
        return displayScreen.value;
    }
}

function deleteLastKey(){
    if(displayScreen.value!="Can't divide by zero"){
        displayScreen.value=displayScreen.value.slice(0,displayScreen.value.length-1);
    }
}

function clearScreen(){
    displayScreen.value=0;
    hiddenScreen.value="";
}

let flag=false;
let hiddenFlag=true;

function addCalc(){

    let digit = this.textContent;
    let val=displayScreen.value;
    
    if(val.length<15){

        if(hiddenScreen.value===" " && digit!="+" && digit!="-" && digit!="*" && digit!="/"){
            if(digit==="."){
                val="0.";
            }
            else{
                val=digit;
            }

            hiddenScreen.value="";
        }
        else if(val==="0" && digit!="+" && digit!="-" && digit!="*" && digit!="/" && digit!="."){
            val=digit;
        }
        else if(val==0 && digit =="."){
            val+=digit;
        }
        else if(val==0 && (digit=="+" || digit=="-" || digit=="*" || digit=="/")){
            return;
        }
        else if((digit=="+" || digit=="-" || digit=="*" || digit=="/")&&!hiddenFlag){
            return
        }
        else if(digit=="+" || digit=="-" || digit=="*" || digit=="/"){
            if(val[val.length-1]===" "){
                return;
            }
            if(hiddenScreen.value==" "){
                hiddenScreen.value="";
            }
            if(hiddenScreen.value==""){
                hiddenScreen.value=val+digit;
                val+=" ";
            }
            else if(hiddenScreen.value!=""){
                hiddenFlag=false;
                flag=true;
                val = calculateResult();
                hiddenScreen.value = val+digit;
            }
            
        }
        else{
            if(val.length==13){
                return;
            }
            hiddenFlag=true;
            if(flag){
                val=digit;
                flag=false;
            }
            else{
                if(digit=="." && val.indexOf(".")!=-1){
                    return;
                }
                if(val[val.length-1]===" "){
                    val=digit;
                }
                else{
                    val+=digit;
                }
            }
        }
    }

    displayScreen.value=val;
}



for(let i=0;i<numberKeys.length;i++){
    numberKeys[i].addEventListener("click",addCalc);
}

const arrOfCalc = [addKey,subtractKey,multiplyKey,divideKey,decimalKey];
for(let i=0;i<arrOfCalc.length;i++){
    arrOfCalc[i].addEventListener("click",addCalc);
}
for(let i=0;i<arrOfCalc.length-1;i++){
    arrOfCalc[i].addEventListener('focus', (e) => {
        e.target.style.backgroundColor = 'Blue';
    });
}
for(let i=0;i<arrOfCalc.length-1;i++){
    arrOfCalc[i].addEventListener('blur', (e) => {
        e.target.style.backgroundColor = '';
    });
}

function addNumber(){
    if(hiddenScreen.value==""){
        hiddenScreen.value=" "
        displayScreen.value= this.textContent;
    }
    else{
        displayScreen.value+=this.textContent;
    }
}

equalKey.addEventListener("click",calculateResult);

clearKey.addEventListener("click",clearScreen);

deleteKey.addEventListener("click",deleteLastKey);

