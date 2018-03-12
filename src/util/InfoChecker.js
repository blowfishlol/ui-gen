export function labelCheck(label) {
    return label ? label : "Err: Label is empty."
}

export function defaultCheck(value) {

    if(value) {
        if(value.hasOwnProperty("default")) {
            if(value.default) {
                console.log("VERDICT", value.default);
                return value.default;
            }
        }
    }

    return null;

}

export function placeholderCheck(value) {
    return value ? (value.hasOwnProperty("placeholder") ? value.placeholder : "" ) : "";
}

export function requiredCheck(value) {
    return value ? "required" : "";
}
