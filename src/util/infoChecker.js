export function labelCheck(label) {
  return label ? label : ""
}

export function placeholderCheck(value) {
  return value ? (value.hasOwnProperty("placeholder") ? value.placeholder : "" ) : ""
}

export function nullInfo(form) {
  return {
    isNullable: form.nullable,
    type: form.type
  }
}
