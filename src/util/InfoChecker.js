export function labelCheck(label) {
  return label ? label : ""
}

export function defaultCheck(value) {
  if(value) {
    if(value.hasOwnProperty("default")) {
      if(value.default) {
        return value.default;
      }
    }
  }
  return "";
}

export function placeholderCheck(value) {
  return value ? (value.hasOwnProperty("placeholder") ? value.placeholder : "" ) : "";
}

export function requiredCheck(value) {
  return value ? "required" : "";
}
