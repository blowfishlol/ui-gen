export default function f(arg) {

    const splitarg = arg.split(" ");
    const result = begin(splitarg);
    if(result === true && typeof(result) === "boolean"){
        return eval(arg);
    }else{
        console.log("DEPENDENCY VALIDATION ERROR:", result);
        return false;
    }


}

function begin(arr) {
    if(arr[0] == "!"){
        return isExcMark(arr);
    }else{
        return isValFirst(arr);
    }
    return "Expects exclamation or value, gets " + arr[0] + "instead"; //illegal beginning
}

function isExcMark(arr) {

    const str = arr.shift();


    if(str.indexOf("!") >= 0) {

        if( arr.length === 0 ) {
            return "Expects next token"; //Expected next token
        }
        return isValFirst(arr);
    }

    return "Expects Exclamation Mark"; //Expects exclemation mark.

}

function isValFirst(arr) {

    const str = arr.shift();

    if( /^[a-zA-Z0-9\."]+$/.test(str) ) {

        if(arr.length === 0) {
            return "Expects operator (==, <= , >, etc)" ; //Expected next token
        }

        return isOperator(arr);
    }

    return "Expects Value, got " + str + " instead"; //Expects value, if value exists, it contains illegal chararcter

}

function isOperator(arr) {

    const str = arr.shift();
    const operatorList = ["==", "<=" , ">=", ">", "<", "!="];
    var opCount = 0;

    operatorList.forEach((op) => {
        if(str === op){
            opCount++;
        }
    });

    if(opCount === 1) {
        if(arr.length === 0) {
            return "Expects value, ends at " + str + " instead"; //Expected next token
        }
        return isValSecond(arr);
    }

    return "Expects operator (>,<,<=,==,etc), got" + str + " instead"; //Expects operator, unknown token found instead.

}

function isValSecond(arr) {

    const str = arr.shift();

    if( /^[a-zA-Z0-9\."]+$/.test(str) ) {
        if(arr.length === 0) {
            return true; //No next token is ok
        }
        return isConnector(arr);
    }
    return "Value contains illegal character"; //Contains illegal character
}

function isConnector(arr) {

    const str = arr.shift();

    if( str==="&&" ^ str==="||" ) {
        if(arr.length === 0) {
            return "Expects next token, ends at " + str + " instead"; //expects next token
        } else {
            if(arr[0].indexOf("!") >= 0){
                return isExcMark(arr);
            } else {
                return isValFirst(arr);
            }
        }
    }
    return "Expects && or ||, got " + str + " instead"; //Expects &&/||, got other instead


}
