import get, { check } from "./get"

const INVALID_ARG_ERROR = "Invalid render argument thrown"

export default function f(arg) {
  try {
    return evals(trim(arg.split(" ")))
  } catch(error) {
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
    isLessOp(arg) || isLessEqualOp(arg) || isOrOp(arg) || isAndOp(arg)
}

function isNegated(arg) {
  return arg.charAt(0) === "!"
}

function isStringLength(arg) {
  return arg.substring(arg.length-7, arg.length) === ".length"
}

function isAPath(arg) {
  return check(arg)
}

function isNumber(arg) {
  return !isNaN(parseFloat(arg)) && parseFloat(arg).toString() === arg
}

function isBoolean(arg) {
  return arg === "true" || arg === "false"
}

function evaluate(arg) {
  if(isEmpty(arg)) {
    return false
  } else if(isNegated(arg)) {
    return ! evaluate(arg.substring(1, arg.length))
  } else if(isStringLength(arg)) {
    return evaluate(arg.substring(0, arg.length-7)).length
  } else if(isAPath(arg)) {
    return get(arg)
  } else if(isNumber(arg)) {
    return parseFloat(arg)
  } else if(isBoolean(arg)) {
    return arg === "true"
  } else {
    return arg
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

function evals(args) {
  if(args.length === 0) {
    throw new Error(INVALID_ARG_ERROR)
  } else if(args.length === 1) {
    return evaluate(args[0])
  }
  var i = find(args, isOp)
  if(i === -1) {
    throw new Error(INVALID_ARG_ERROR)
  }
  return operate(args, i)
}
