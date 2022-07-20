(() => {
  var __commonJS = (cb, mod) => function __require() {
    return mod || (0, cb[Object.keys(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };

  // src/Time.js
  var require_Time = __commonJS({
    "src/Time.js"(exports) {
      "use strict";
      (function(exports2) {
        var delta_t = [
          124,
          115,
          106,
          98,
          91,
          85,
          79,
          74,
          70,
          65,
          62,
          58,
          55,
          53,
          50,
          48,
          46,
          44,
          42,
          40,
          37,
          35,
          33,
          31,
          28,
          26,
          24,
          22,
          20,
          18,
          16,
          14,
          13,
          12,
          11,
          10,
          9,
          9,
          9,
          9,
          9,
          9,
          9,
          9,
          10,
          10,
          10,
          10,
          10,
          11,
          11,
          11,
          11,
          11,
          11,
          11,
          12,
          12,
          12,
          12,
          12,
          12,
          13,
          13,
          13,
          13,
          14,
          14,
          14,
          15,
          15,
          15,
          15,
          16,
          16,
          16,
          16,
          16,
          17,
          17,
          17,
          17,
          17,
          17,
          17,
          17,
          16,
          16,
          15,
          14,
          13.7,
          13.1,
          12.7,
          12.5,
          12.5,
          12.5,
          12.5,
          12.5,
          12.5,
          12.3,
          12,
          11.4,
          10.6,
          9.6,
          8.6,
          7.5,
          6.6,
          6,
          5.7,
          5.6,
          5.7,
          5.9,
          6.2,
          6.5,
          6.8,
          7.1,
          7.3,
          7.5,
          7.7,
          7.8,
          7.9,
          7.5,
          6.4,
          5.4,
          2.9,
          1.6,
          -1,
          -2.7,
          -3.6,
          -4.7,
          -5.4,
          -5.2,
          -5.5,
          -5.6,
          -5.8,
          -5.9,
          -6.2,
          -6.4,
          -6.1,
          -4.7,
          -2.7,
          0,
          2.6,
          5.4,
          7.7,
          10.5,
          13.4,
          16,
          18.2,
          20.2,
          21.2,
          22.4,
          23.5,
          23.9,
          24.3,
          24,
          23.9,
          23.9,
          23.7,
          24,
          24.3,
          25.3,
          26.2,
          27.3,
          28.2,
          29.1,
          30,
          30.7,
          31.4,
          32.2,
          33.1,
          34,
          35,
          36.5,
          38.3,
          40.2,
          42.2,
          44.5,
          46.5,
          48.5,
          50.5,
          52.2,
          53.8,
          54.9,
          55.8,
          56.9,
          58.3
        ];
        var nut_args = [
          [0, 0, 0, 0, 1],
          [-2, 0, 0, 2, 2],
          [0, 0, 0, 2, 2],
          [0, 0, 0, 0, 2],
          [0, 1, 0, 0, 0],
          [0, 0, 1, 0, 0],
          [-2, 1, 0, 2, 2],
          [0, 0, 0, 2, 1],
          [0, 0, 1, 2, 2],
          [-2, -1, 0, 2, 2],
          [-2, 0, 1, 0, 0],
          [-2, 0, 0, 2, 1],
          [0, 0, -1, 2, 2],
          [2, 0, 0, 0, 0],
          [0, 0, 1, 0, 1],
          [2, 0, -1, 2, 2],
          [0, 0, -1, 0, 1],
          [0, 0, 1, 2, 1],
          [-2, 0, 2, 0, 0],
          [0, 0, -2, 2, 1],
          [2, 0, 0, 2, 2],
          [0, 0, 2, 2, 2],
          [0, 0, 2, 0, 0],
          [-2, 0, 1, 2, 2],
          [0, 0, 0, 2, 0],
          [-2, 0, 0, 2, 0],
          [0, 0, -1, 2, 1],
          [0, 2, 0, 0, 0],
          [2, 0, -1, 0, 1],
          [-2, 2, 0, 2, 2],
          [0, 1, 0, 0, 1],
          [-2, 0, 1, 0, 1],
          [0, -1, 0, 0, 1],
          [0, 0, 2, -2, 0],
          [2, 0, -1, 2, 1],
          [2, 0, 1, 2, 2],
          [0, 1, 0, 2, 2],
          [-2, 1, 1, 0, 0],
          [0, -1, 0, 2, 2],
          [2, 0, 0, 2, 1],
          [2, 0, 1, 0, 0],
          [-2, 0, 2, 2, 2],
          [-2, 0, 1, 2, 1],
          [2, 0, -2, 0, 1],
          [2, 0, 0, 0, 1],
          [0, -1, 1, 0, 0],
          [-2, -1, 0, 2, 1],
          [-2, 0, 0, 0, 1],
          [0, 0, 2, 2, 1],
          [-2, 0, 2, 0, 1],
          [-2, 1, 0, 2, 1],
          [0, 0, 1, -2, 0],
          [-1, 0, 1, 0, 0],
          [-2, 1, 0, 0, 0],
          [1, 0, 0, 0, 0],
          [0, 0, 1, 2, 0],
          [0, 0, -2, 2, 2],
          [-1, -1, 1, 0, 0],
          [0, 1, 1, 0, 0],
          [0, -1, 1, 2, 2],
          [2, -1, -1, 2, 2],
          [0, 0, 3, 2, 2],
          [2, -1, 0, 2, 2]
        ];
        var nut_coeffs = [
          [-171996, -174.2, 92025, 8.9],
          [-13187, -1.6, 5736, -3.1],
          [-2274, -0.2, 977, -0.5],
          [2062, 0.2, -895, 0.5],
          [1426, -3.4, 54, -0.1],
          [712, 0.1, -7, 0],
          [-517, 1.2, 224, -0.6],
          [-386, -0.4, 200, 0],
          [-301, 0, 129, -0.1],
          [217, -0.5, -95, 0.3],
          [-158, 0, 0, 0],
          [129, 0.1, -70, 0],
          [123, 0, -53, 0],
          [63, 0, 0, 0],
          [63, 0.1, -33, 0],
          [-59, 0, 26, 0],
          [-58, -0.1, 32, 0],
          [-51, 0, 27, 0],
          [48, 0, 0, 0],
          [46, 0, -24, 0],
          [-38, 0, 16, 0],
          [-31, 0, 13, 0],
          [29, 0, 0, 0],
          [29, 0, -12, 0],
          [26, 0, 0, 0],
          [-22, 0, 0, 0],
          [21, 0, -10, 0],
          [17, -0.1, 0, 0],
          [16, 0, -8, 0],
          [-16, 0.1, 7, 0],
          [-15, 0, 9, 0],
          [-13, 0, 7, 0],
          [-12, 0, 6, 0],
          [11, 0, 0, 0],
          [-10, 0, 5, 0],
          [-8, 0, 3, 0],
          [7, 0, -3, 0],
          [-7, 0, 0, 0],
          [-7, 0, 3, 0],
          [-7, 0, 3, 0],
          [6, 0, 0, 0],
          [6, 0, -3, 0],
          [6, 0, -3, 0],
          [-6, 0, 3, 0],
          [-6, 0, 3, 0],
          [5, 0, 0, 0],
          [-5, 0, 3, 0],
          [-5, 0, 3, 0],
          [-5, 0, 3, 0],
          [4, 0, 0, 0],
          [4, 0, 0, 0],
          [4, 0, 0, 0],
          [-4, 0, 0, 0],
          [-4, 0, 0, 0],
          [-4, 0, 0, 0],
          [3, 0, 0, 0],
          [-3, 0, 0, 0],
          [-3, 0, 0, 0],
          [-3, 0, 0, 0],
          [-3, 0, 0, 0],
          [-3, 0, 0, 0],
          [-3, 0, 0, 0],
          [-3, 0, 0, 0]
        ];
        var FD0 = 297.85036 * DEG2RAD, FD1 = 445267.11148 * DEG2RAD, FD2 = -19142e-7 * DEG2RAD, FD3 = DEG2RAD / 189474, FM0 = 357.52772 * DEG2RAD, FM1 = 35999.05034 * DEG2RAD, FM2 = -86972e-7 * DEG2RAD, FM3 = -DEG2RAD / 3e5, FMM0 = 134.96298 * DEG2RAD, FMM1 = 477198.867398 * DEG2RAD, FMM2 = 86972e-7 * DEG2RAD, FMM3 = DEG2RAD / 56250, FF0 = 93.27191 * DEG2RAD, FF1 = 483202.017538 * DEG2RAD, FF2 = -36825e-7 * DEG2RAD, FF3 = DEG2RAD / 327270, FO0 = 125.04452 * DEG2RAD, FO1 = -1934.136261 * DEG2RAD, FO2 = 20708e-7 * DEG2RAD, FO3 = DEG2RAD / 45e4;
        function getNutation(JD) {
          var JDE = JD2toJDE(JD);
          var T = JDtoJY2K(JDE) / 100, T2 = T * T, T3 = T2 * T;
          var D = FD0 + FD1 * T + FD2 * T2 + FD3 * T3;
          var M = FM0 + FM1 * T + FM2 * T2 + FM3 * T3;
          var MM = FMM0 + FMM1 * T + FMM2 * T2 + FMM3 * T3;
          var F = FF0 + FF1 * T + FF2 * T2 + FF3 * T3;
          var O = FO0 + FO1 * T + FO2 * T2 + FO3 * T3;
          var c_longitude = 0, c_obliquity = 0;
          var coeff_sine, coeff_cos, arg;
          for (var i = 0; i < nut_coeffs.length; i++) {
            coeff_sine = nut_coeffs[i][0] + nut_coeffs[i][1] * T;
            coeff_cos = nut_coeffs[i][2] + nut_coeffs[i][3] * T;
            arg = nut_args[i][0] * D + nut_args[i][1] * M + nut_args[i][2] * MM + nut_args[i][3] * F + nut_args[i][4] * O;
            c_longitude += coeff_sine * Math.sin(arg);
            c_obliquity += coeff_cos * Math.cos(arg);
          }
          var c_ecliptic = 23 + 26 / 60 + 21.448 / 3600 - 46.815 / 3600 * T - 59e-5 / 3600 * T2 + 1813e-6 / 3600 * T3;
          c_ecliptic *= DEG2RAD;
          c_longitude /= 3600 * 100 * 100 / DEG2RAD;
          c_obliquity /= 3600 * 100 * 100 / DEG2RAD;
          return {
            longitude: TURN(c_longitude),
            obliquity: TURN(c_obliquity),
            ecliptic: CYCLE(c_ecliptic)
          };
        }
        function getDynamicalTimeDiffSH1(JD) {
          var E = (JD - 20673145e-1) / 36525;
          return 1830 - 405 * E + 46.5 * E * E;
        }
        function getDynamicalTimeDiffSH2(JD) {
          var t = (JD - 23967585e-1) / 36525;
          return 22.5 * t * t;
        }
        function getDynamicalTimeDiffTable(JD) {
          var i = Math.floor((JD - 23127525e-1) / 730.5);
          if (i > delta_t.length - 2)
            i = delta_t.length - 2;
          var a = delta_t[i + 1] - delta_t[i], b = delta_t[i + 2] - delta_t[i + 1], c = a - b, n = (JD - (23127525e-1 + 730.5 * i)) / 730.5;
          return delta_t[i + 1] + n / 2 * (a + b + n * c);
        }
        function getDynamicalTimeDiffNear(JD) {
          var delta_T = [56.86, 63.83, 70];
          var a = delta_T[1] - delta_T[0], b = delta_T[2] - delta_T[1], c = b - a;
          var n = (JD - 24515445e-1) / 3652.5;
          return delta_T[1] + n / 2 * (a + b + n * c);
        }
        function getDynamicalTimeDiffElse(JD) {
          var a = JD - 2382148;
          return -15 + a * a / 41048480;
        }
        function getDynamicalTimeDiff(JD) {
          if (JD < 20673145e-1) {
            return getDynamicalTimeDiffSH1(JD);
          } else if (JD >= 20673145e-1 && JD < 23054475e-1) {
            return getDynamicalTimeDiffSH2(JD);
          } else if (JD >= 23127525e-1 && JD < 24486225e-1) {
            return getDynamicalTimeDiffTable(JD);
          } else if (JD >= 24486225e-1 && JD <= 24551975e-1) {
            return getDynamicalTimeDiffNear(JD);
          }
          return getDynamicalTimeDiffElse(JD);
        }
        function JDtoJDE(JD) {
          return JD + getDynamicalTimeDiff(JD) / JD2SEC;
        }
        function JDEtoJD(JDE) {
          return JDE - getDynamicalTimeDiff(JDE) / JD2SEC;
        }
        var FST1 = 280.46061837 * DEG2RAD, FST2 = 360.98564736629 * DEG2RAD, FST3 = 387933e-9 * DEG2RAD, FST4 = -DEG2RAD / 3871e4, FLON = 1;
        function getMeanSiderealTime(JD) {
          var T = JDtoJY2K(JD) / 100;
          var sidereal = FST1 + FST2 * (JD - 2451545) + FST3 * T * T + FST4 * T * T * T;
          return CYCLE(sidereal);
        }
        function getApparentSiderealTime(JD) {
          var nutation = getNutation(JD);
          return getMeanSiderealTime(JD) + nutation.longitude / FLON * Math.cos(nutation.obliquity);
        }
        exports2.JDtoJDE = JDtoJDE;
        exports2.JDEtoJD = JDEtoJD;
        exports2.getMeanSiderealTime = getMeanSiderealTime;
        exports2.getApparentSiderealTime = getApparentSiderealTime;
        exports2.getNutation = getNutation;
      })(exports);
    }
  });
  require_Time();
})();
