import _ from 'lodash';

export default class LightDarkDeterminator {

  getAccessibilityValuesFromHex = e => {
    var t = this
      , r = {
        WHITE: "#ffffff",
        BLACK: "#000000"
      }
      , o = {}
      , i = [{
        large: !1,
        textColor: r.WHITE,
        ratio: 4.5,
        titlePriority: 2
      }, {
        large: !0,
        textColor: r.WHITE,
        ratio: 3,
        titlePriority: 4
      }, {
        large: !1,
        textColor: r.BLACK,
        ratio: 4.5,
        titlePriority: 1
      }, {
        large: !0,
        textColor: r.BLACK,
        ratio: 3,
        titlePriority: 3
      }]
      , n = null
      , c = null
      , a = null
      , l = null
      , s = null
      , m = null;
    return _.each(i, function (r) {
      var i = t.minAcceptableAlpha(e, r.textColor, r.ratio)
        , d = i ? Math.max(i, .87) : null;
      i && (!r.large && r.titlePriority && t.isTextLegibleOverBackground(r.textColor, e) && (!c || r.titlePriority > m) && (c = r.textColor,
        m = r.titlePriority),
        r.titlePriority && t.isTextLegibleOverBackground(r.textColor, e) && (!n || r.titlePriority > s) && (n = r.textColor,
          s = r.titlePriority,
          a = d,
          l = t.getRgbaFromHexAndAlpha(r.textColor, d)),
        o.defaults || (o.defaults = []),
        o.defaults.push({
          recAlpha: d,
          minAlpha: i,
          criteria: r
        }))
    }),
      o.criterias = {},
      _.each(o.defaults, function (e) {
        e.preferredTitleColor = n,
          e.preferredNormalColor = c,
          e.preferredTitleRecAlpha = a,
          e.preferredTitleRgba = l;
        var t = e.criteria.textColor == r.WHITE ? "white" : "black"
          , i = e.criteria.large ? "large" : "normal";
        o.criterias[t] || (o.criterias[t] = {}),
          o.criterias[t][i] = e
      }),
      o.preferredTitleColor = n,
      o.preferredNormalColor = c,
      o.preferredTitleRecAlpha = a,
      o.preferredTitleRgba = l,
      o
  }

  minAcceptableAlpha = (e, t, r) => {
    var o = this.hex2Rgb(e)
      , i = this.hex2Rgb(t)
      , n = 0
      , c = 1
      , a = this.blendForegroundContrast(o, i, n);
    if (a >= r)
      return null;
    var l = this.blendForegroundContrast(o, i, c);
    if (r > l)
      return null;
    for (var s = 0, m = 10, d = .01; m >= s && c - n > d;) {
      var h = (n + c) / 2
        , p = this.blendForegroundContrast(o, i, h);
      r > p ? n = h : c = h,
        ++s
    }
    return s > m ? null : c
  }

  hex2Rgb = e => {
    if (!e)
      return null;
    var t = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    e = e.replace(t, function (e, t, r, o) {
      return t + t + r + r + o + o
    });
    var r = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(e);
    return r ? {
      r: parseInt(r[1], 16),
      g: parseInt(r[2], 16),
      b: parseInt(r[3], 16)
    } : null
  }

  blendForegroundContrast = (e, t, r) => {
    if (1 > r) {
      var o = this.overlayOn(e, t, r);
      return this.opaqueContrast(o, e)
    }
    return this.opaqueContrast(e, t)
  }

  overlayOn = (e, t, r) => {
    var o = {};
    return r >= 1 ? e : (o.r = t.r * r + e.r * (1 - r),
      o.g = t.g * r + e.g * (1 - r),
      o.b = t.b * r + e.b * (1 - r),
      o.a = r + 1 * (1 - r),
      o)
  }

  opaqueContrast = (e, t, r) => {
    var o = this.getLFromRgbColor(t) + .05
      , i = this.getLFromRgbColor(e) + .05
      , n = o / i;
    return i > o && (n = 1 / n),
      n
  }

  isTextLegibleOverBackground = (e, t) => {
    var r = arguments.length <= 2 || void 0 === arguments[2] ? 14 : arguments[2]
      , o = arguments.length <= 3 || void 0 === arguments[3] ? 300 : arguments[3]
      , i = this.getLFromHex(e)
      , n = this.getLFromHex(t)
      , c = !1;
    if (i !== !1 && n !== !1) {
      var a = 14 == r && o >= 700 || r >= 18
        , l = (Math.max(i, n) + .05) / (Math.min(i, n) + .05);
      c = l >= 3 && a ? !0 : l >= 3 && 4.5 > l && !a ? !1 : l >= 4.5 && !a ? !0 : !1
    }
    return c
  }

  getLFromHex = e => {
    var t = this.hex2Rgb(e);
    return this.getLFromRgbColor(t)
  }

  getLFromRgbValue = e => {
    var t = e / 255;
    return .03928 > t ? t / 12.92 : Math.pow((t + .055) / 1.055, 2.4)
  }

  getLFromRgbColor = e => {
    var t = {};
    return t.r = this.getLFromRgbValue(e.r),
      t.g = this.getLFromRgbValue(e.g),
      t.b = this.getLFromRgbValue(e.b),
      .2126 * t.r + .7152 * t.g + .0722 * t.b
  }

  getRgbaFromHexAndAlpha = (e, t) => {
    var r = this.hex2Rgb(e);
    return t = t ? t.toFixed(2) : 1,
      "rgba(" + r.r + ", " + r.g + ", " + r.b + ", " + t + ")"
  }


}


