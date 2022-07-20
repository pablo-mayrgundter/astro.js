(() => {
  var __commonJS = (cb, mod) => function __require() {
    return mod || (0, cb[Object.keys(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };

  // src/Math.js
  var require_Math = __commonJS({
    "src/Math.js"(exports) {
      var JY2JD = 365.25;
      var JD2000 = 2451545;
      var PI = 1 * Math.PI;
      var TAU = 2 * Math.PI;
      var AstroJS = exports.AstroJS = {
        AU2M: 149597870700,
        AU2KM: 1495978707e-1,
        PC2M: 30856776e9,
        PC2AU: 206265,
        PC2LY: 3.26156,
        KM2M: 1e3,
        JY2JD,
        JD2SEC: 24 * 60 * 60,
        MSOL2KG: 198855e25,
        DEG2RAD: TAU / 360
      };
      for (name in AstroJS) {
        units = name.split("2", 2);
        inv = units.reverse().join("2");
        AstroJS[inv] = 1 / AstroJS[name];
      }
      var units;
      var inv;
      var name;
      AstroJS.exportConstants = function exportAstroConstants(base) {
        for (var name2 in AstroJS) {
          base[name2] = AstroJS[name2];
        }
      };
      AstroJS.DMS2RAD = function DMS2RAD2(d, m, s) {
        var dms = Math.abs(d);
        var sigma = d < 0 ? -1 : 1;
        dms += m / 60 + s / 60 / 60;
        return sigma * dms * DEG2RAD;
      };
      AstroJS.HMS2RAD = function HMS2RAD(h, m, s) {
        return DMS2RAD(h, m, s) * 15;
      };
      AstroJS.PI = PI;
      AstroJS.TAU = TAU;
      AstroJS.JD2000 = JD2000;
      var GMJD = AstroJS.GMJD = {
        sun: 2959122083684144e-19,
        mer: 4912547451450812e-26,
        ven: 7243452486162703e-25,
        ear: 8997011603631609e-25,
        emb: 8997011603631609e-25,
        mar: 9549535105779258e-26,
        jup: 2825345842083778e-22,
        sat: 8459715185680659e-23,
        ura: 12920249167819694e-24,
        nep: 15243589007842763e-24,
        plu: 21886997654259697e-28,
        moon: 10936508975881017e-27
      };
      var GMJY = AstroJS.GMJY = {};
      for (name in GMJD) {
        GMJY[name] = GMJD[name];
        GMJY[name] *= 133407.5625;
      }
      var name;
      AstroJS.CYCLE = function CYCLE(rad) {
        rad %= TAU;
        if (rad < 0)
          rad += TAU;
        return rad;
      };
      AstroJS.TURN = function TURN(rad) {
        rad %= TAU;
        if (rad > PI)
          rad -= TAU;
        return rad;
      };
      AstroJS.JDtoJY2K = function JDtoJY2K(JD) {
        return (JD - JD2000) / JY2JD;
      };
      AstroJS.JY2KtoJD = function JY2KtoJD(J2K) {
        return J2K * JY2JD + JD2000;
      };
      AstroJS.exportConstants(exports);
      var KM2AU2 = Math.pow(AstroJS.KM2AU, 2);
      var KM2AU3 = Math.pow(AstroJS.KM2AU, 3);
      Math.cbrt = Math.cbrt || function(x) {
        var y = Math.pow(Math.abs(x), 1 / 3);
        return x < 0 ? -y : y;
      };
      Math.fmod = Math.fmod || function(a, b) {
        return a % b;
      };
      if (typeof THREE != "undefined") {
        Vector3 = exports.Vector3 = THREE.Vector3;
        Matrix3 = exports.Matrix3 = THREE.Matrix3;
        Matrix4 = exports.Matrix4 = THREE.Matrix4;
        Quaternion = exports.Quaternion = THREE.Quaternion;
      }
      var Vector3;
      var Matrix3;
      var Matrix4;
      var Quaternion;
    }
  });
  require_Math();
})();
