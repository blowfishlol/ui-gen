export default function f(arg) {

    const splitarg = arg.split(" ");
    const result = begin(splitarg);
    if(result === true && typeof(result) === "boolean"){
        try {
            return eval(arg);
        } catch(err) {
            console.log("ERROR ON EVAL: ", err.message);
            return false;
        }
    }else{
        console.log("DEPENDENCY VALIDATION ERROR:", result);
        return false;
    }


}

/**
 * Starting point of the validator.
 * If found exclamation mark will go to isExcMark
 * if not will check if it is the first value
 **/
function begin(arr) {
    if(arr[0] == "!"){
        return isExcMark(arr);
    }else{
        return isValFirst(arr);
    }
    return "Expects exclamation or value, gets " + arr[0] + "instead"; //illegal beginning
}

/**
 * Checks if the next value after ! is first value
 **/
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

/**
 * Check if it is the first value of the condition
 **/
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

/**
 * Checks if the token is an operator or not
 **/
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

/**
 * Check if the token is the second value
 **/
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

/**
 * Check if the token is a connector
 **/
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
