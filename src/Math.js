/*############################################################################*/
// AstroJS Base Math Module (c) 2016 by Marcel Greter
// https://www.github.com/mgreter/astrojs/LICENSE
/*############################################################################*/


import * as THREE from 'three'


// global constants for math operations

// use TAU, PI is wrong ;)
export const PI = 1 * Math.PI;
export const TAU = 2 * Math.PI;

// create namespace for constants
// we still define local variables
// wrap anonymous function around!
//var AstroJS = this.AstroJS = {

// astronomical units to meters
export const AU2M = 1.495978707e+11
// astronomical units to kilometers
export const AU2KM = 1.495978707e+8
// parsecs to meters
export const PC2M = 30856776e9
// parsecs to AUs
export const PC2AU = 206265
export const PC2LY = 3.26156
// metric conversion
export const KM2M = 1000
// julian day conversion
// JDs in one JY
export const JY2JD = 365.25
// time conversion
export const JD2SEC = 24 * 60 * 60
// solar mass conversion
export const MSOL2KG = 1.98855e30
// trig conversion factors
export const DEG2RAD = TAU / 360
// not very useful!
// HMS2RAD: TAU / 24,
// HMS2DEG: 360 / 24,
//}

// JulianYear    = 365.25      // days
// JulianCentury = 36525       // days
// BesselianYear = 365.2421988 // days

// TODO(pablo): fix
// create inverted functions
// for (var name in AstroJS) {
//   const units = name.split('2', 2);
//  const inv = units.reverse().join('2');
//  AstroJS[inv] = 1 / AstroJS[name];
// }


// degrees, minutes, seconds to rad
export function DMS2RAD(d, m, s) {
  let dms = Math.abs(d)
  const sigma = d < 0 ? -1 : 1
  dms += m / 60 + s / 60 / 60
  return sigma * dms * DEG2RAD
}

// hours, minutes, seconds to rad
export function HMS2RAD(h, m, s) {
  return DMS2RAD(h, m, s) * 15
}

// J2000 epoch in JD
export const JD2000 = 2451545.0

// Gravitational parameters for astronomic scale
// time in days, distance in AU, mass in sun-mass
// http://astronomy.stackexchange.com/a/7981
// GM * M2AU^3 * JD2SEC^2 * MSOL2KG
export const GMJD = {
  // VSOP2013 Masses system (INPOP10A)
  sun: 2.9591220836841438269e-04, // sun
  mer: 4.9125474514508118699e-11, // mer
  ven: 7.2434524861627027000e-10, // ven
  ear: 8.9970116036316091182e-10, // ear
  emb: 8.9970116036316091182e-10, // emb
  mar: 9.5495351057792580598e-11, // mar
  jup: 2.8253458420837780000e-07, // jup
  sat: 8.4597151856806587398e-08, // sat
  ura: 1.2920249167819693900e-08, // ura
  nep: 1.5243589007842762800e-08, // nep
  plu: 2.1886997654259696800e-12, // plu
  moon: 1.0936508975881017456e-11 // moon
}

// covert to a different time factor
// time in julian years, distance in AU
export const GMJY = {}
for (const name in GMJD) {
  GMJY[name] = GMJD[name]
  GMJY[name] *= 133407.5625
  // => Math.pow(365.25, 2)
}

// covert to a different time factor
// time in julian seconds, distance in AU
// https://www.aanda.org/articles/aa/full_html/2013/09/aa21843-13/T1.html
export const GMJS = {}
for (const name in GMJD) {
  GMJS[name] = GMJD[name]
  GMJS[name] /= 746496e4
  // => Math.pow(86400, 2)
}



/** from 0 to TAU, one full cycle */
export function CYCLE(rad) {
  rad %= TAU
  if (rad < 0) {
    rad += TAU
  }
  return rad
}


/** from -PI to +PI, turn left/right */
export function TURN(rad) {
  rad %= TAU
  if (rad > PI) {
    rad -= TAU
  }
  return rad
}


// Julian Days to J2000
export function JDtoJY2K(JD) {
  // offset epoch and add ratio
  return (JD - JD2000) / JY2JD
}


// J2000 to Julian Days
export function JY2KtoJD(J2K) {
  // add ratio and offset epoch
  return J2K * JY2JD + JD2000
}

// internal constants for math operations

// maximum iterations to find
// a value in range for epsilon
// used in Newton-Raphson solver
export const MAXLOOP = 12

// polyfill for cube root function
// from https://developer.mozilla.org
Math.cbrt = Math.cbrt || function (x) {
  const y = Math.pow(Math.abs(x), 1 / 3)
  return x < 0 ? -y : y
}

// makes it easier to port C code
Math.fmod = Math.fmod || function (a, b) {
  return a % b
}
