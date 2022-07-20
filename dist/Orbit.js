(() => {
  var __commonJS = (cb, mod) => function __require() {
    return mod || (0, cb[Object.keys(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };

  // src/Orbit.js
  var require_Orbit = __commonJS({
    "src/Orbit.js"(exports) {
      "use strict";
      (function(exports2) {
        var abs = Math.abs;
        var pow = Math.pow;
        var sin = Math.sin;
        var cos = Math.cos;
        var sqrt = Math.sqrt;
        var cbrt = Math.cbrt;
        var atan2 = Math.atan2;
        function asin(angle) {
          return Math.asin(Math.min(1, Math.max(-1, angle)));
        }
        function acos(angle) {
          return Math.acos(Math.min(1, Math.max(-1, angle)));
        }
        function Orbit(arg) {
          var orbit = this;
          if (arg.empty) {
            return orbit;
          }
          if ("G" in arg)
            console.warn("G has been renamed to GM");
          orbit._GM = arg.GM || arg.G || Orbit.GMP.sun, orbit._t = arg.epoch || arg.t || 0;
          orbit.translate = arg.translate || null;
          if ("x" in arg && "y" in arg && "z" in arg) {
            orbit._r = new Vector3(arg.x, arg.y, arg.z);
          } else if ("rx" in arg && "ry" in arg && "rz" in arg) {
            orbit._r = new Vector3(arg.rx, arg.ry, arg.rz);
          }
          if ("X" in arg && "Y" in arg && "Z" in arg) {
            orbit._v = new Vector3(arg.X, arg.Y, arg.Z);
          } else if ("vx" in arg && "vy" in arg && "vz" in arg) {
            orbit._v = new Vector3(arg.vx, arg.vy, arg.vz);
          }
          if ("r" in arg && "v" in arg) {
            var r = arg.r, v = arg.v;
            orbit._r = new Vector3(r.x, r.y, r.z);
            orbit._v = new Vector3(v.x, v.y, v.z);
          }
          orbit.vectors = !!(orbit._r && orbit._v);
          var vars = "aeiMnPLcCwWOkhqpG".split("");
          for (var i in vars) {
            if (arg.hasOwnProperty(vars[i])) {
              orbit["_" + vars[i]] = arg[vars[i]];
            }
          }
          orbit._PW = arg.PW || 0;
          orbit._PO = arg.PO || 0;
          if ("name" in arg) {
            orbit.name = arg.name;
          }
          if (!orbit.lazy) {
            orbit.updateElements();
            orbit.requireElements();
          }
        }
        Orbit.GMP = GMJD;
        var Klass = Orbit.prototype;
        Klass.clone = function clone(jy2k) {
          var orbit = this;
          var epoch = orbit._t || 0;
          var dt = jy2k == null ? 0 : jy2k - epoch;
          var clone2 = new Orbit({ empty: true });
          if (dt) {
            delete orbit._v;
            delete orbit._r;
          }
          for (var key in orbit) {
            if (orbit.hasOwnProperty(key)) {
              if (orbit[key] && typeof orbit[key].clone == "function") {
                clone2[key] = orbit[key].clone();
              } else {
                clone2[key] = orbit[key];
              }
            }
          }
          if (dt)
            clone2._update(jy2k);
          return clone2;
        };
        Klass.checkElements = function checkElements(full) {
          var orbit = this;
          if (!orbit.elements)
            throw "Orbitals not calculated";
          if (!("_i" in orbit))
            throw "Orbit is missing inclination (i)";
          if (!("_e" in orbit))
            throw "Orbit is missing eccentricity (e)";
          if (!("_a" in orbit))
            throw "Orbit is missing semi-major axis (a)";
          if (!("_b" in orbit))
            throw "Orbit is missing semi-minor axis (b)";
          if (!("_l" in orbit))
            throw "Orbit is missing semi-latus rectum (l)";
          if (!("_c" in orbit))
            throw "Orbit is missing periapsis (c)";
          if (!("_C" in orbit))
            throw "Orbit is missing apoapsis (C)";
          if (!("_L" in orbit))
            throw "Orbit is missing mean longitude (L)";
          if (!("_O" in orbit))
            throw "Orbit is missing right ascending node (O)";
          if (!("_T" in orbit))
            throw "Orbit is missing time of periapsis (w)";
          if (!("_t" in orbit))
            throw "Orbit is missing time of reference epoch (t)";
          if (!("_w" in orbit))
            throw "Orbit is missing argument of periapsis (w)";
          if (!("_W" in orbit))
            throw "Orbit is missing longitude of the periapsis (W)";
          if (!("_n" in orbit))
            throw "Orbit is missing mean motion (n)";
          if (!("_M" in orbit))
            throw "Orbit is missing mean anomaly (M)";
          if (!("_P" in orbit))
            throw "Orbit is missing orbital period (P)";
          if (!("_A" in orbit))
            throw "Orbit is missing angular momentum (A)";
          if (!("_c" in orbit))
            throw "Orbit is missing pericenter (c)";
          if (!("_C" in orbit))
            throw "Orbit is missing apocenter (C)";
          if (orbit._e < 0)
            throw "Negative eccentricity is invalid";
          if (orbit._e > 1)
            throw "Eccentricity must not be hyperbolic (> 1)";
          if (orbit._e == 1)
            throw "Eccentricity must not be parabolic (== 1)";
          if (full) {
            if (!("_m" in orbit))
              throw "Orbit is missing true anomaly (m)";
          }
          if (full) {
            if (!("_B" in orbit))
              throw "Orbit is missing radial velocity (B)";
          }
          if (full) {
            if (!("_E" in orbit))
              throw "Orbit is missing eccentric anomaly (E)";
          }
        };
        Klass.requireElements = function requireElements(full) {
          this.updateElements(full);
          this.checkElements(full);
          return this;
        };
        Klass.updateElements = function updateElements(full) {
          var orbit = this;
          if (orbit.elements)
            return orbit;
          orbit.elements = true;
          if ("_r" in orbit && "_v" in orbit) {
            var r = orbit._r, v = orbit._v, GM = orbit._GM, rl = r.length();
            orbit._A3 = r.clone().cross(v);
            orbit._A2 = orbit._A3.lengthSq();
            orbit._A = sqrt(orbit._A2);
            orbit._B = r.dot(v) / rl;
            var e3 = orbit._e3 = r.clone().multiplyScalar(v.lengthSq() - GM / rl).sub(v.clone().multiplyScalar(rl * orbit._B)).multiplyScalar(1 / GM);
            var e2 = e3.lengthSq(), e = orbit._e = sqrt(e2);
            orbit._i = acos(orbit._A3.z / orbit._A);
            orbit._l = orbit._A2 / GM;
            orbit._c = orbit._l / (1 + e);
            orbit._C = orbit._l / (1 - e);
            orbit._a = (orbit._C + orbit._c) / 2;
            var nx = -orbit._A3.y, ny = +orbit._A3.x;
            var nl = sqrt(nx * nx + ny * ny);
            var omega = nl == 0 ? 0 : acos(nx / nl);
            orbit._O = ny < 0 ? TAU - omega : omega;
            var nedot = nx * e3.x + ny * e3.y;
            if (nl === 0 || e === 0) {
              orbit._w = 0;
            } else {
              orbit._w = acos(nedot / nl / e);
            }
            if (e3.z < 0) {
              orbit._w *= -1;
            }
            var u;
            if (e === 0 && nl === 0) {
              u = acos(r.x / rl);
            } else if (e === 0) {
              var nrdot = nx * r.x + ny * r.y;
              u = acos(nrdot / (nl * rl));
            } else {
              var redot = e3.x * r.x + e3.y * r.y + e3.z * r.z;
              u = acos(redot / e / rl);
            }
            var m = orbit._m = orbit._B < 0 ? TAU - u : u;
            if (e < 1) {
              var E = orbit._E = CYCLE(atan2(sqrt(1 - e * e) * sin(m), e + cos(m)));
              orbit._M = E - e * sin(E);
            } else if (e > 1) {
              var E = orbit._E = CYCLE(atan2(sqrt(1 - e * e) * sin(m), e + cos(m)));
              orbit._M = E - e * sin(E);
            }
            orbit._M = E - e * sin(E);
          }
          if ("_k" in orbit && "_h" in orbit) {
            orbit._W = atan2(orbit._h, orbit._k);
            orbit._e = orbit._h / sin(orbit._W);
          }
          if ("_q" in orbit && "_p" in orbit) {
            orbit._O = atan2(orbit._p, orbit._q);
            var d = orbit._p - orbit._q, dt = -sqrt(2) * sin(PI / 4 - orbit._O);
            orbit._i = 2 * asin(d / dt);
          }
          if ("_n" in orbit && !("_a" in orbit)) {
            orbit._a = cbrt(orbit._GM / orbit._n / orbit._n);
          }
          if ("_P" in orbit && !("_a" in orbit)) {
            var PTAU = orbit._P / TAU;
            orbit._a = cbrt(orbit._GM * PTAU * PTAU);
          }
          if (!("_a" in orbit)) {
            if ("_c" in orbit && "_C" in orbit) {
              orbit._a = (orbit._C + orbit._c) / 2;
            } else if ("_e" in orbit && "_C" in orbit) {
              orbit._a = orbit._C / (1 + orbit._e);
            } else if ("_c" in orbit && "_e" in orbit) {
              orbit._a = orbit._c / (1 - orbit._e);
            }
          }
          if (!("_e" in orbit)) {
            if ("_c" in orbit && "_C" in orbit) {
              orbit._e = 1 - orbit._c / orbit._a;
            } else if ("_a" in orbit && "_C" in orbit) {
              orbit._e = orbit._C / orbit._a - 1;
            } else if ("_c" in orbit && "_a" in orbit) {
              orbit._e = 1 - orbit._c / orbit._a;
            }
          }
          if ("_e" in orbit) {
            var e2term = 1 - orbit._e * orbit._e;
            if ("_a" in orbit) {
              orbit._l = orbit._a * e2term;
              orbit._b = sqrt(orbit._a * orbit._l);
            } else if ("_b" in orbit) {
              orbit._a = orbit._b / sqrt(e2term);
              orbit._l = orbit._a * e2term;
            } else if ("_l" in orbit) {
              orbit._a = orbit._l / e2term;
              orbit._b = sqrt(orbit._a * orbit._l);
            }
          } else if ("_a" in orbit) {
            if ("_b" in orbit) {
              orbit._l = orbit._b * orbit._b / orbit._a;
              orbit._e = sqrt(1 - orbit._l / orbit._a);
            } else if ("_l" in orbit) {
              orbit._e = sqrt(1 - orbit._l / orbit._a);
              orbit._b = sqrt(orbit._a * orbit._l);
            }
          } else if ("_b" in orbit && "_l" in orbit) {
            orbit.a = orbit._b * orbit._b / orbit._l;
            orbit._e = sqrt(1 - orbit._l / orbit._a);
          }
          if ("_a" in orbit && !("_P" in orbit)) {
            orbit._P = TAU / sqrt(orbit._GM) * pow(orbit._a, 1.5);
          }
          if ("_P" in orbit && !("_n" in orbit)) {
            orbit._n = TAU / orbit._P;
          }
          if ("_P" in orbit && !("_A" in orbit)) {
            if ("_a" in orbit && "_b" in orbit) {
              orbit._A = TAU * orbit._a * orbit._b / orbit._P;
            }
          }
          if ("_a" in orbit && "_e" in orbit) {
            if (!("_c" in orbit))
              orbit._c = orbit._a * (1 - orbit._e);
            if (!("_C" in orbit))
              orbit._C = orbit._a * (1 + orbit._e);
          }
          if ("_L" in orbit) {
            if ("_M" in orbit) {
              orbit._W = orbit._L - orbit._M;
              if ("_O" in orbit)
                orbit._w = orbit._W - orbit._O;
              else if ("_w" in orbit)
                orbit._O = orbit._W - orbit._w;
            } else if ("_W" in orbit) {
              orbit._M = orbit._L - orbit._W;
              if ("_O" in orbit)
                orbit._w = orbit._W - orbit._O;
              else if ("_w" in orbit)
                orbit._O = orbit._W - orbit._w;
            } else if ("_O" in orbit && "_w" in orbit) {
              orbit._W = orbit._O + orbit._w;
              orbit._M = orbit._L - orbit._W;
            } else {
              throw "Orbit incomplete";
            }
          } else if ("_O" in orbit) {
            if ("_w" in orbit) {
              orbit._W = orbit._O + orbit._w;
              if ("_M" in orbit)
                orbit._L = orbit._M + orbit._W;
            } else if ("_W" in orbit) {
              orbit._w = orbit._W - orbit._O;
              if ("_M" in orbit)
                orbit._L = orbit._M + orbit._W;
            } else {
              throw "Orbit incomplete";
            }
          } else if ("_M" in orbit && "_w" in orbit && "_W" in orbit) {
            orbit._L = orbit._W + orbit._M;
            orbit._O = orbit._W - orbit._w;
          }
          if (full)
            orbit.m();
          if ("_W" in orbit)
            orbit._W = TURN(orbit._W);
          if ("_L" in orbit)
            orbit._L = CYCLE(orbit._L);
          if ("_M" in orbit)
            orbit._M = CYCLE(orbit._M);
          if ("_O" in orbit)
            orbit._O = CYCLE(orbit._O);
          if ("_w" in orbit)
            orbit._w = TURN(orbit._w);
          if ("_M" in orbit && "_n") {
            orbit._T = -orbit._M / orbit._n;
          }
          return orbit;
        };
        Klass.E = function eccentricAnomaly(jy2k) {
          var orbit = this;
          var epoch = orbit._t || 0;
          var dt = jy2k == null ? 0 : jy2k - epoch;
          if ("_E" in orbit && !dt) {
            return orbit._E;
          }
          var e = orbit._e, m = orbit._m, M = orbit._M;
          if (!dt && e != null && m != null) {
            return orbit._E = CYCLE(atan2(sqrt(1 - e * e) * sin(m), e + cos(m)));
          }
          if (e != null && M != null) {
            if (dt)
              M += CYCLE(orbit._n * dt);
            var E = e < 0.8 ? M : PI;
            var f, dfdE, dE = 1;
            for (var it = 0; abs(dE) > EPSILON && it < MAXLOOP; ++it) {
              f = M - E + e * sin(E);
              dfdE = e * cos(E) - 1;
              dE = f / dfdE;
              E -= dE;
            }
            E = CYCLE(E);
            if (!dt)
              orbit._E = E;
            return E;
          }
          throw "Invalid orbital state";
          return null;
        };
        Klass.m = function trueAnomaly(E) {
          var orbit = this;
          if (arguments.length === 0) {
            if ("_m" in orbit) {
              return orbit._m;
            }
            var hE = orbit.E() / 2;
            return orbit._m = CYCLE(2 * atan2(sqrt(1 + orbit._e) * sin(hE), sqrt(1 - orbit._e) * cos(hE)));
          } else {
            return CYCLE(2 * atan2(sqrt(1 + orbit._e) * sin(E / 2), sqrt(1 - orbit._e) * cos(E / 2)));
          }
        };
        Klass.B = function radialVelocity() {
          var orbit = this;
          if ("_B" in orbit)
            return orbit._B;
          var r = orbit.r(), v = orbit.v();
          return orbit._B = r.dot(v) / r.length();
        };
        Klass.e3 = function eccentricity3() {
          var orbit = this;
          if ("_e3" in orbit)
            return orbit._e3;
          var r = orbit.r(), v = orbit.v();
          if (r !== null && v !== null) {
            return orbit._e3 = r.clone().multiplyScalar(v.lengthSq() - orbit._GM / r.length()).sub(v.clone().multiplyScalar(r.length() * orbit.B())).multiplyScalar(1 / orbit._GM);
          }
        };
        Klass.i = function inclination() {
          return this._i;
        };
        Klass.e = function eccentricity() {
          return this._e;
        };
        Klass.a = function semiMajorAxis() {
          return this._a;
        };
        Klass.b = function semiMinorAxis() {
          return this._b;
        };
        Klass.l = function semilatusRectum() {
          return this._l;
        };
        Klass.C = function apocenter() {
          return this._C;
        };
        Klass.c = function pericenter() {
          return this._c;
        };
        Klass.L = function meanLongitude() {
          return this._L;
        };
        Klass.O = function ascendingNode() {
          return this._O;
        };
        Klass.w = function argOfPeriapsis() {
          return this._w;
        };
        Klass.T = function timeOfPericenter() {
          return this._T;
        };
        Klass.W = function longitudeOfPeriapsis() {
          return this._W;
        };
        Klass.n = function meanMotion() {
          return this._n;
        };
        Klass.A = function angularMomentum() {
          return this._A;
        };
        Klass.M = function meanAnomaly() {
          return this._M;
        };
        Klass.P = function orbitalPeriod() {
          return this._P;
        };
        Klass.GM = function gravitationalParameter() {
          return this._GM;
        };
        Klass.PW = function apsidalPrecession() {
          return this._PW;
        };
        Klass.PO = function nodalPrecession() {
          return this._PO;
        };
        Klass.epoch = function epoch() {
          return this._t;
        };
        Klass.q = function vsopPeriapsis() {
          var orbit = this;
          if ("_q" in orbit)
            return orbit._q;
          return orbit._q = cos(orbit._O) * sin(orbit._i / 2);
        };
        Klass.p = function vsopApoapsis() {
          var orbit = this;
          if ("_p" in orbit)
            return orbit._p;
          return orbit._p = sin(orbit._O) * sin(orbit._i / 2);
        };
        Klass.k = function vsopK() {
          var orbit = this;
          if ("_k" in orbit)
            return orbit._k;
          return orbit._k = orbit._e * cos(orbit._W);
        };
        Klass.h = function vsopH() {
          var orbit = this;
          if ("_h" in orbit)
            return orbit._h;
          return orbit._h = orbit._e * sin(orbit._W);
        };
        Klass._update = function update(jy2k) {
          var orbit = this;
          var epoch = orbit._t || 0;
          var dt = jy2k == null ? 0 : jy2k - epoch;
          if (!orbit.elements)
            orbit.resolveElements(true);
          orbit._M = CYCLE(orbit._n * (dt - orbit._T));
          orbit._L = CYCLE(orbit._M + orbit._W);
          if (orbit._PW)
            orbit._w = dt / orbit._PW * TAU;
          if (orbit._PO)
            orbit._O += dt / orbit._PO * TAU;
          orbit._t = dt + epoch;
          delete orbit._E;
          delete orbit._m;
          delete orbit._r;
          delete orbit._v;
          return orbit;
        };
        Klass.state = function state(jy2k) {
          var orbit = this, mat;
          var epoch = orbit._t || 0;
          var dt = jy2k == null ? 0 : jy2k - epoch;
          if (!orbit.elements)
            orbit.resolveElements(true);
          if (!dt && "_r" in orbit && "_v" in orbit) {
            return {
              r: orbit._r,
              v: orbit._v,
              epoch,
              orbit,
              GM: orbit._GM
            };
          }
          var e = orbit._e, a = orbit._a, i = orbit._i, O = orbit._O, w = orbit._w, M = orbit._M, E = orbit.E(jy2k), m = orbit.m(E);
          if (orbit._PW)
            w += dt / orbit._PW * TAU;
          if (orbit._PO)
            O += dt / orbit._PO * TAU;
          var r = a * (1 - e * cos(E));
          var vf = sqrt(orbit._GM * a) / r;
          var rx = r * cos(m), ry = r * sin(m), vx = vf * -sin(E), vy = vf * sqrt(1 - e * e) * cos(E);
          var sinO = sin(O), cosO = cos(O), sinI = sin(i), cosI = cos(i), sinW = sin(w), cosW = cos(w), sinWcosO = sinW * cosO, sinWsinO = sinW * sinO, cosWcosO = cosW * cosO, cosWsinO = cosW * sinO, sinWcosI = sinW * cosI, FxX = cosWcosO - sinWcosI * sinO, FyX = cosWsinO + sinWcosI * cosO, FxY = cosWsinO * cosI + sinWcosO, FyY = cosWcosO * cosI - sinWsinO, FzX = sinW * sinI, FzY = cosW * sinI;
          var r = new Vector3(rx * FxX - ry * FxY, rx * FyX + ry * FyY, rx * FzX + ry * FzY);
          var v = new Vector3(vx * FxX - vy * FxY, vx * FyX + vy * FyY, vx * FzX + vy * FzY);
          if (!dt)
            orbit._r = r, orbit._v = v;
          return {
            r,
            v,
            epoch,
            orbit,
            GM: orbit._GM
          };
        };
        Klass.r = function position3(jy2k) {
          var state = this.state(jy2k);
          return state.r;
        };
        Klass.v = function velocity3(jy2k) {
          var state = this.state(jy2k);
          return state.v;
        };
        Klass.inclination = Klass.i;
        Klass.eccentricity = Klass.e;
        Klass.semiMajorAxis = Klass.a;
        Klass.semiMinorAxis = Klass.b;
        Klass.semilatusRectum = Klass.l;
        Klass.meanLongitude = Klass.L;
        Klass.ascendingNode = Klass.O;
        Klass.argOfPericenter = Klass.w;
        Klass.argOfPeriapsis = Klass.w;
        Klass.timeOfPericenter = Klass.T;
        Klass.longitudeOfPericenter = Klass.W;
        Klass.meanMotion = Klass.n;
        Klass.meanAnomaly = Klass.M;
        Klass.orbitalPeriod = Klass.P;
        Klass.angularMomentum = Klass.A;
        Klass.gravitationalParameter = Klass.GM;
        Klass.apsidalPrecession = Klass.PW;
        Klass.nodalPrecession = Klass.PO;
        Klass.trueAnomaly = Klass.m;
        Klass.radialVelocity = Klass.B;
        Klass.eccentricAnomaly = Klass.E;
        Klass.apoapsis = Klass.C;
        Klass.aphelion = Klass.C;
        Klass.apocenter = Klass.C;
        Klass.periapsis = Klass.c;
        Klass.perhelion = Klass.c;
        Klass.pericenter = Klass.c;
        Klass.position = Klass.r;
        Klass.velocity = Klass.v;
        exports2.Orbit = exports2.Orbital = Orbit;
      })(exports);
    }
  });
  require_Orbit();
})();
