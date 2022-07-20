(() => {
  var __commonJS = (cb, mod) => function __require() {
    return mod || (0, cb[Object.keys(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };

  // src/Coord.js
  var require_Coord = __commonJS({
    "src/Coord.js"(exports) {
      "use strict";
      (function(exports2) {
        function cyl() {
          return { p: this.p, l: this.l, z: this.z };
        }
        function cart() {
          return { x: this.x, y: this.y, z: this.z };
        }
        function sph() {
          return { l: this.l, b: this.b, i: this.i, r: this.r };
        }
        function cart2sph() {
          this.r = Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
          this.i = Math.acos(this.z / this.r), this.b = PI / 2 - this.i;
          this.l = Math.atan2(this.y, this.x);
          return (this.sph = sph).call(this);
        }
        function sph2cart() {
          var rsb = this.r * Math.sin(this.i);
          this.x = rsb * Math.cos(this.l);
          this.y = rsb * Math.sin(this.l);
          this.z = this.r * Math.cos(this.i);
          return (this.cart = cart).call(this);
        }
        function cart2cyl() {
          this.p = Math.sqrt(this.x * this.x + this.y * this.y);
          this.l = Math.atan2(this.y, this.x);
          return (this.cyl = cyl).call(this);
        }
        function cyl2cart() {
          this.x = this.p * Math.cos(this.l);
          this.y = this.p * Math.sin(this.l);
          return (this.cart = cart).call(this);
        }
        function cyl2sph() {
          this.i = Math.atan2(this.p, this.z), this.b = PI / 2 - this.i;
          this.r = Math.sqrt(this.p * this.p + this.z * this.z);
          return (this.sph = sph).call(this);
        }
        function sph2cyl() {
          this.p = this.r * Math.cos(this.b);
          this.z = this.r * Math.sin(this.b);
          return (this.cyl = cyl).call(this);
        }
        function Coord(state) {
          if ("ra" in state)
            state.l = state.ra;
          if ("dec" in state)
            state.b = state.dec;
          if ("dist" in state)
            state.r = state.dist;
          if ("x" in state && "y" in state && "z" in state) {
            this.x = state.x, this.y = state.y, this.z = state.z;
            this.cart = cart, this.sph = cart2sph, this.cyl = cart2cyl;
          } else if ("p" in state && "l" in state && "z" in state) {
            this.p = state.p, this.l = state.l, this.z = state.z;
            this.cart = cyl2cart, this.sph = cyl2sph, this.cyl = cyl;
          } else if ("l" in state) {
            this.l = state.l, this.r = state.r || 1;
            if ("i" in state || "b" in state) {
              this.cart = sph2cart, this.sph = sph, this.cyl = sph2cyl;
              if ("b" in state)
                this.b = state.b, this.i = PI / 2 - this.b;
              else if ("i" in state)
                this.i = state.i, this.b = PI / 2 - this.i;
            }
          }
        }
        Coord.prototype.ecl2equ = function ecl2equ(tilt) {
          var cart2 = this.cart(), sin_e = Math.sin(tilt), cos_e = Math.cos(tilt);
          return new Coord({
            x: cart2.x,
            y: cart2.y * cos_e - cart2.z * sin_e,
            z: cart2.z * cos_e + cart2.y * sin_e
          });
        };
        Coord.prototype.equ2ecl = function equ2ecl(tilt) {
          var cart2 = this.cart(), sin_e = Math.sin(tilt), cos_e = Math.cos(tilt);
          return new Coord({
            x: cart2.x,
            y: cart2.y * cos_e + cart2.z * sin_e,
            z: cart2.z * cos_e - cart2.y * sin_e
          });
        };
        var posangle = 32.932 * DEG2RAD;
        var pole_ra = 192.859508 * DEG2RAD;
        var pole_dec = 27.128336 * DEG2RAD;
        Coord.prototype.gal2equ = function gal2equ() {
          var sph2 = this.sph(), l = sph2.l, b = sph2.b, sin_b = Math.sin(b), cos_b = Math.cos(b), sin_pdc = Math.sin(pole_dec), cos_pdc = Math.cos(pole_dec), sin_pos = Math.sin(l - posangle), cos_pos = Math.cos(l - posangle), sincos_bp = cos_b * sin_pos;
          var B = Math.asin(sin_b * sin_pdc + sincos_bp * cos_pdc);
          var L = Math.atan2(cos_b * cos_pos, sin_b * cos_pdc - sincos_bp * sin_pdc);
          return { l: CYCLE(L + pole_ra), b: TURN(B) };
        };
        Coord.prototype.equ2gal = function equ2gal() {
          var sph2 = this.sph(), l = sph2.l, b = sph2.b, sin_b = Math.sin(b), cos_b = Math.cos(b), tan_b = sin_b / cos_b, sin_pdc = Math.sin(pole_dec), cos_pdc = Math.cos(pole_dec), sin_pos = Math.sin(pole_ra - l), cos_pos = Math.cos(pole_ra - l), sincos_bp = cos_b * sin_pos;
          var B = Math.asin(sin_b * sin_pdc + cos_b * cos_pdc * cos_pos);
          var L = Math.atan2(sin_pos, cos_pos * sin_pdc - tan_b * cos_pdc);
          return { l: CYCLE(posangle - L - PI / 2), b: TURN(B) };
        };
        var PFA = 2306.2181 * DEG2RAD, PFB = 1.39656 * DEG2RAD, PFC = 139e-6 * DEG2RAD, PFD = 0.30188 * DEG2RAD, PFE = 344e-6 * DEG2RAD, PFF = 0.017998 * DEG2RAD, PFG = 1.09468 * DEG2RAD, PFH = 66e-6 * DEG2RAD, PFI = 0.018203 * DEG2RAD, PFJ = 2004.3109 * DEG2RAD, PFK = 0.8533 * DEG2RAD, PFL = 217e-6 * DEG2RAD, PFM = 0.42665 * DEG2RAD, PFN = 217e-6 * DEG2RAD, PFP = 0.041833 * DEG2RAD;
        Coord.prototype.precess = function precess(JD, epoch) {
          var mean_ra = this.l, mean_dec = this.b;
          var eta, zeta, theta, T, T2, t = (JD - epoch) / 36e4, t2 = t * t, t3 = t2 * t;
          if (t) {
            T = epoch / 36e4, T2 = T * T;
            eta = (PFA + PFB * T - PFC * T2) * t + (PFG + PFH * T) * t2 + PFI * t3;
            zeta = (PFA + PFB * T - PFC * T2) * t + (PFD - PFE * T) * t2 + PFF * t3;
            theta = (PFJ - PFK * T - PFN * T2) * t - (PFM + PFN * T) * t2 - PFP * t3;
          } else {
            eta = PFA * t + PFG * t2 + PFP * t3;
            zeta = PFA * t + PFD * t2 + PFF * t3;
            theta = PFJ * t - PFN * t2 - PFP * t3;
          }
          var sin_md = Math.sin(mean_dec), cos_md = Math.cos(mean_dec), mean_term = cos_md * Math.cos(mean_ra + zeta), A = cos_md * Math.sin(mean_ra + zeta), B = Math.cos(theta) * mean_term - Math.sin(theta) * Math.sin(mean_dec), C = Math.sin(theta) * mean_term + Math.cos(theta) * Math.sin(mean_dec);
          var ra = Math.atan2(A, B) + eta, dec;
          if (mean_dec > 0.4 * PI || mean_dec < -0.4 * PI) {
            dec = Math.acos(Math.sqrt(A * A + B * B));
            if (mean_dec < 0) {
              dec *= -1;
            }
          } else {
            dec = Math.asin(C);
          }
          var coord = { l: CYCLE(ra), b: TURN(dec) };
          if ("r" in this)
            coord.r = this.r;
          return coord;
        };
        exports2.Coord = Coord;
      })(exports);
    }
  });
  require_Coord();
})();
