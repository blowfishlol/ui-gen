export default function getLayoutString(layout) {

    if(!layout) {
        return "col-sm-12 col-md-4 col-xl-3";
        //return "col";
    }

    var layoutString = "";

    if(Number.isInteger(layout.mobile)) {
        layoutString += "col-sm-" + layout.mobile + " ";
    } else {
        layoutString += "col-sm-* ";
    }

    if(Number.isInteger(layout.tablet)) {
        layoutString += "col-md-" + layout.tablet + " ";
    } else {
        layoutString += "col-md-* ";
    }

    if(Number.isInteger(layout.desktop)) {
        layoutString += "col-lg-" + layout.desktop + " ";
    } else {
        layoutString += "col-lg-*";
    }

    return layoutString;

}
