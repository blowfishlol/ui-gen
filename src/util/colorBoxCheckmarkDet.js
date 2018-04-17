export const WHITE = "#FFFFFF"
export const BLACK = "#000000"
const def = {
  r: 255,
  g: 255,
  b: 255
}

function hexToRGB(hex) {
  let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : def;
}

function calcLuminance(rgb) {
  Object.keys(rgb).forEach(c => {
    rgb[c] /= 255.0
    if(rgb[c] <= 0.03928) {
      rgb[c] /= 12.92
    } else {
      rgb[c] = Math.pow(((rgb[c]+0.055)/1.055), 2.4)
    }
  })
  return 0.2126 * rgb.r + 0.7152 * rgb.g + 0.0722 * rgb.b
}

export default function detColor(hex) {
  if(calcLuminance(hexToRGB(hex)) > 0.179) {
    return BLACK
  } else {
    return WHITE
  }
}