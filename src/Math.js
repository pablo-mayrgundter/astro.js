// global constants for math operations

// use TAU, PI is wrong
var PI = 1 * Math.PI;
var TAU = 2 * Math.PI;

// create namespace for constants
// we still define local variables
// wrap anonymous function around!
var AstroJS = this.AstroJS = {

	// astronomical units to meters
	AU2M: 1.495978707e+11,
	// astronomical units to kilometers
	AU2KM: 1.495978707e+8,
	// meters to parsecs
	PC2M: 30856776e9,
	// metric conversion
	KM2M: 1000,
	// julian day conversion
	JY2JD: 365.25,
	// time conversion
	JD2SEC: 24*60*60,
	// solar mass conversion
	MSOL2KG: 1.98855e30,
	// trig conversion factors
	DEG2RAD: TAU / 360,
	HMS2RAD: TAU / 24,
	HMS2DEG: 360 / 24,

}

// create inverted functions
for (var name in AstroJS) {
	var units = name.split('2', 2);
	var inv = units.reverse().join('2');
	AstroJS[inv] = 1 / AstroJS[name];
}

AstroJS.exportConstants =
// export function might be handy
function exportAstroConstants(base) {
	for (var name in AstroJS) {
		base[name] = AstroJS[name];
	}
}

// Gravitational parameters for astronomic scale
// time in days, distance in AU, mass in sun-mass
// http://astronomy.stackexchange.com/a/7981
// GM * M2AU^3 * JD2SEC^2 * MSOL2KG
var GMP = AstroJS.GMP = {
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
	plu: 2.1886997654259696800e-12 // plu
};

AstroJS.CYCLE =
// from 0 to TAU
// one full cycle
function CYCLE(rad) {
	rad %= TAU;
	if (rad < 0)
		rad += TAU;
	return rad;
}

AstroJS.TURN =
// from -PI to +PI
// turn left/right
function TURN(rad) {
	rad %= TAU;
	if (rad > PI)
		rad -= TAU;
	return rad;
}

AstroJS.JD2J2K =
// Julian Days to J2000
function JD2J2K (JD)
{
	// offset epoch and add ratio
	return (JD - T2K) / JY2JD;
}

AstroJS.J2K2JD =
// J2000 to Julian Days
function J2K2JD (J2K)
{
	// add ratio and offset epoch
	return J2K * JY2JD + T2K;
}

// export into global scope
AstroJS.exportConstants(this);

// internal constants for math operations

// exponential factors
var KM2AU2 = Math.pow(AstroJS.KM2AU, 2);
var KM2AU3 = Math.pow(AstroJS.KM2AU, 3);

// J2000 epoch in JD
var T2K = 2451545.0; // TT

// maximum iterations to find
// a value in range for epsilon
// used in Newton-Raphson solver
var MAXLOOP = 12;
var EPSILON = 1e-12;

// polyfill for cube root function
// from https://developer.mozilla.org
Math.cbrt = Math.cbrt || function(x) {
	var y = Math.pow(Math.abs(x), 1/3);
	return x < 0 ? -y : y;
};

// THREE.Vector3 compatible implementation
if (typeof THREE != "undefined") {
	this.Vector3 = THREE.Vector3;
}
