import get, { check } from "./get"

const INVALID_ARG_ERROR = "Invalid render argument thrown"
const PATH_NOT_FOUND_ERROR = "no_path"

/**
 * this method accept a string (with a specific format) as parameter
 * and evaluate the value of the string
 * then return a boolean
 * used to evaluate the truth value of rendered property
 * thrown by PageNavigator when it's trying to render a page or
 * thrown by App when it's trying to render one or more of it's element
 * (return true meant to tell that the component should be rendered)
 */
export default function f(arg) {
  try {
    return evals(trim(arg.split(" ")))
  } catch(error) {
    if(error.message === PATH_NOT_FOUND_ERROR) {
      return false
    }
    alert("Error: " + error.message + ": '" + arg + "'")
  }
  return false
}

function find(args, cond) {
  return args.findIndex(cond)
}

function trim(args) {
  var i = find(args, isEmpty)
  if(i !== -1) {
    return [].concat(args.split(0, i), args.split(i+1, args.length))
  } else {
    return args
  }
}

function isEmpty(arg) {
  return arg === undefined || arg === null || arg === ""
}

function isEqualOp(arg) {
  return arg === "=" || arg === "==" || arg === "==="
}

function isNegation(arg) {
  return arg === "!"
}

function isNotEqualOp(arg) {
  return arg === "!=" || arg === "!=="
}

function isMoreOp(arg) {
  return arg === ">"
}

function isMoreEqualOp(arg) {
  return arg === ">="
}

function isLessOp(arg) {
  return arg === "<"
}

function isLessEqualOp(arg) {
  return arg === "<="
}

function isOrOp(arg) {
  return arg === "||" || arg === "OR" || arg === "or"
}

function isAndOp(arg) {
  return arg === "&&" || arg === "AND" || arg === "and"
}

function isOp(arg) {
  return isEqualOp(arg) || isNegation(arg) || isNotEqualOp(arg) || isMoreOp(arg) || isMoreEqualOp(arg) ||
    isLessOp(arg) || isLessEqualOp(arg)
}

function isLogicGate(arg) {
  return isOrOp(arg) || isAndOp(arg)
}

function isNegated(arg) {
  return arg.charAt(0) === "!"
}

function isStringLength(arg) {
  return arg.substring(arg.length-7, arg.length) === ".length"
}

function isNumber(arg) {
  return !isNaN(parseFloat(arg)) && parseFloat(arg).toString() === arg
}

function isBoolean(arg) {
  return arg === "true" || arg === "false"
}

function isString(arg) {
  return arg.charAt(0) === arg.charAt(arg.length-1) && (arg.charAt(0) === "\"" || arg.charAt(0) === "'")
}

function isAPath(arg) {
  return check(arg)
}

function evaluate(arg) {
  if(isEmpty(arg)) {
    return false
  } else if(isNegated(arg)) {
    return ! evaluate(arg.substring(1, arg.length))
  } else if(isStringLength(arg)) {
    return evaluate(arg.substring(0, arg.length-7)).length
  } else if(isNumber(arg)) {
    return parseFloat(arg)
  } else if(isBoolean(arg)) {
    return arg === "true"
  } else if(isString(arg)) {
    return arg.substring(1, arg.length - 1)
  } else if(isAPath(arg)) {
    return get(arg)
  } else {
    throw new Error(PATH_NOT_FOUND_ERROR)
  }
}

function operate(args, index) {
  if(isEqualOp(args[index])) {
    return evals(args.slice(0, index)) === evals(args.slice(index+1, args.length))
  } else if(isNegation(args[index])) {
    if(index !== 0) {
      throw new Error(INVALID_ARG_ERROR)
    }
    return ! evals(args.slice(1, args.length))
  } else if(isNotEqualOp(args[index])) {
    return evals(args.slice(0, index)) !== evals(args.slice(index+1, args.length))
  } else if(isMoreOp(args[index])) {
    return evals(args.slice(0, index)) > evals(args.slice(index+1, args.length))
  } else if(isMoreEqualOp(args[index])) {
    return evals(args.slice(0, index)) >= evals(args.slice(index+1, args.length))
  } else if(isLessOp(args[index])) {
    return evals(args.slice(0, index)) < evals(args.slice(index+1, args.length))
  } else if(isLessEqualOp(args[index])) {
    return evals(args.slice(0, index)) <= evals(args.slice(index+1, args.length))
  } else if(isOrOp(args[index])) {
    return evals(args.slice(0, index)) || evals(args.slice(index+1, args.length))
  } else if(isAndOp(args[index])) {
    return evals(args.slice(0, index)) && evals(args.slice(index+1, args.length))
  }
}

/**
 * use a simple parsing algorithm
 * take an array of string containing a sequence of arguments to be evaluated
 * accepted arguments:
 * string, number, boolean, variable(pointing to storage.data),
 * binary operator and unary operator (not all)
 */
function evals(args) {
  if(args.length === 0) {
    throw new Error(INVALID_ARG_ERROR)
  } else if(args.length === 1) {
    return evaluate(args[0])
  }
  var i = find(args, isLogicGate)
  if(i === -1) {
    i = find(args, isOp)
    if(i === -1) {
      throw new Error(INVALID_ARG_ERROR)
    }
  }
  return operate(args, i)
}
