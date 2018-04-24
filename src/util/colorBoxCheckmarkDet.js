export const WHITE = "#FFFFFF"
export const BLACK = "#000000"
const TRESHOLD = 0.179
const PERCENT_RED = 0.2126
const PERCENT_GREEN = 0.7152
const PERCENT_BLUE = 0.722
const DEFAULT_RGB = {
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
  } : DEFAULT_RGB;
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
  return PERCENT_RED * rgb.r + PERCENT_GREEN * rgb.g + PERCENT_BLUE * rgb.b
}

export default function detColor(hex) {
  if(calcLuminance(hexToRGB(hex)) > TRESHOLD) {
    return BLACK
  } else {
    return WHITE
  }
}