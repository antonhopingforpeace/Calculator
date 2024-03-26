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


function calculateResult(){
    let hVal=hiddenScreen.value;
    let val=displayScreen.value;
    if(hVal==""||hVal==" "||val[val.length-1]===" "){
        return;
    }
    else{
        let op = hVal.substr(-1);
        let numberOne = hVal.slice(0,hVal.length-1);
        let numberTwo = val;
        val = operate(numberOne,op,numberTwo);
        while(val[val.length-1]==0){
            val=val.slice(0,val.length-1);
        }
        if(val[val.length-1]=="."){
            val=val.slice(0,val.length-1);
        }
        hVal="";
        
        if(this.textContent=="="){
            hVal=" ";
        }

        if(val.length>13){
            if(val[val.length-4]=="e"||val[val.length-3]=="e"){
                let placeOfE= val.indexOf("e");
                val = val.slice(0,13-val.slice(placeOfE).length)+val.slice(placeOfE)
            }
            else{
                val = val.slice(0,13);
            }
        }
        
        hiddenScreen.value = hVal;
        displayScreen.value = val;
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
    let hVal = hiddenScreen.value;

    if(val.length<15){

        if(hVal===" " && digit!="+" && digit!="-" && digit!="*" && digit!="/"){
            if(digit==="."){
                val="0.";
            }
            else{
                val=digit;
            }

            hVal="";
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
            if(hVal==" "){
                hVal="";
            }
            if(hVal==""){
                hVal=val+digit;
                val+=" ";
            }
            else if(hVal!=""){
                hiddenFlag=false;
                flag=true;
                val = calculateResult();
                hVal = val+digit;
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
    
    hiddenScreen.value=hVal;
    displayScreen.value=val;
}


//Declaration of usable buttons+screens of Calculator
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


//Declaration of Event Listeners for each button+screen of calulator
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

equalKey.addEventListener("click",calculateResult);

clearKey.addEventListener("click",clearScreen);

deleteKey.addEventListener("click",deleteLastKey);

