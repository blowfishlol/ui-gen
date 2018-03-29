export function labelCheck(label) {
  return label ? label : ""
}

export function placeholderCheck(value) {
  return value ? (value.hasOwnProperty("placeholder") ? value.placeholder : "" ) : "";
}
