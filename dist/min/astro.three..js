/* autogenerated by webmerge (compile context) */
;
/*
Astronomical Calculations (https://github.com/mgreter/astro.js)
- Copyright (c) 2017 Marcel Greter (http://github.com/mgreter)
*/;
/* Include three.js (Vector3) before */;
var $jscomp=$jscomp||{};$jscomp.scope={};$jscomp.defineProperty="function"==typeof Object.defineProperties?Object.defineProperty:function(b,h,e){b!=Array.prototype&&b!=Object.prototype&&(b[h]=e.value)};$jscomp.getGlobal=function(b){return"undefined"!=typeof window&&window===b?b:"undefined"!=typeof global&&null!=global?global:b};$jscomp.global=$jscomp.getGlobal(this);
$jscomp.polyfill=function(b,h,e,c){if(h){e=$jscomp.global;b=b.split(".");for(c=0;c<b.length-1;c++){var k=b[c];k in e||(e[k]={});e=e[k]}b=b[b.length-1];c=e[b];h=h(c);h!=c&&null!=h&&$jscomp.defineProperty(e,b,{configurable:!0,writable:!0,value:h})}};$jscomp.polyfill("Math.cbrt",function(b){return b?b:function(b){if(0===b)return b;b=Number(b);var e=Math.pow(Math.abs(b),1/3);return 0>b?-e:e}},"es6-impl","es3");
(function(b){var h=1*Math.PI,e=2*Math.PI,c=this.AstroJS={AU2M:149597870700,AU2KM:1.495978707E8,PC2M:30856776E9,PC2AU:206265,PC2LY:3.26156,KM2M:1E3,JY2JD:365.25,JD2SEC:86400,MSOL2KG:1.98855E30,DEG2RAD:e/360},k;for(k in c)b=k.split("2",2).reverse().join("2"),c[b]=1/c[k];c.exportConstants=function(y){for(var b in c)y[b]=c[b]};c.DMS2RAD=function(b,c,a){return(0>b?-1:1)*(Math.abs(b)+(c/60+a/60/60))*DEG2RAD};c.HMS2RAD=function(b,c,a){return 15*DMS2RAD(b,c,a)};c.PI=h;c.TAU=e;c.JD2000=2451545;var w=c.GMJD=
{sun:2.959122083684144E-4,mer:4.912547451450812E-11,ven:7.243452486162703E-10,ear:8.997011603631609E-10,emb:8.997011603631609E-10,mar:9.549535105779258E-11,jup:2.825345842083778E-7,sat:8.459715185680659E-8,ura:1.2920249167819694E-8,nep:1.5243589007842763E-8,plu:2.1886997654259697E-12};b=c.GMJY={};for(k in w)b[k]=w[k],b[k]*=133407.5625;c.CYCLE=function(b){b%=e;0>b&&(b+=e);return b};c.TURN=function(b){b%=e;b>h&&(b-=e);return b};c.JD2J2K=function(b){return(b-2451545)/365.25};c.J2K2JD=function(b){return 365.25*
b+2451545};c.exportConstants(this);Math.cbrt=Math.cbrt||function(b){var c=Math.pow(Math.abs(b),1/3);return 0>b?-c:c};Math.fmod=Math.fmod||function(b,c){return b%c};"undefined"!=typeof THREE&&(this.Vector3=THREE.Vector3);"use strict";(function(b){function c(a){if(a.empty)return this;this._G=a.G||c.GMP.sun;this._t=a.epoch||a.t||0;this.translate=a.translate||null;"x"in a&&"y"in a&&"z"in a?this._r=new Vector3(a.x,a.y,a.z):"rx"in a&&"ry"in a&&"rz"in a&&(this._r=new Vector3(a.rx,a.ry,a.rz));"X"in a&&"Y"in
a&&"Z"in a?this._v=new Vector3(a.X,a.Y,a.Z):"vx"in a&&"vy"in a&&"vz"in a&&(this._v=new Vector3(a.vx,a.vy,a.vz));if("r"in a&&"v"in a){var b=a.r,d=a.v;this._r=new Vector3(b.x,b.y,b.z);this._v=new Vector3(d.x,d.y,d.z)}this.vectors=!(!this._r||!this._v);var b="aeiMnPLcCwWOkhqpG".split(""),f;for(f in b)a.hasOwnProperty(b[f])&&(this["_"+b[f]]=a[b[f]]);"name"in a&&(this.name=a.name);this.lazy||(this.updateElements(),this.requireElements())}c.GMP=w;var a=c.prototype;a.clone=function(a){var b=new c({empty:!0});
a&&(delete this._v,delete this._r);for(var d in this)this.hasOwnProperty(d)&&(b[d]=this[d]&&"function"==typeof this[d].clone?this[d].clone():this[d]);a&&b.update(a);return b};a.checkElements=function(a){if(!this.elements)throw"Orbitals not calculated";if(!("_i"in this))throw"Orbit is missing inclination (i)";if(!("_e"in this))throw"Orbit is missing eccentricity (e)";if(!("_a"in this))throw"Orbit is missing semi-major axis (a)";if(!("_b"in this))throw"Orbit is missing semi-minor axis (b)";if(!("_l"in
this))throw"Orbit is missing semi-latus rectum (l)";if(!("_c"in this))throw"Orbit is missing periapsis (c)";if(!("_C"in this))throw"Orbit is missing apoapsis (C)";if(!("_L"in this))throw"Orbit is missing mean longitude (L)";if(!("_O"in this))throw"Orbit is missing right ascending node (O)";if(!("_T"in this))throw"Orbit is missing time of periapsis (w)";if(!("_w"in this))throw"Orbit is missing argument of periapsis (w)";if(!("_W"in this))throw"Orbit is missing longitude of the periapsis (W)";if(!("_n"in
this))throw"Orbit is missing mean motion (n)";if(!("_M"in this))throw"Orbit is missing mean anomaly (M)";if(!("_P"in this))throw"Orbit is missing orbital period (P)";if(!("_A"in this))throw"Orbit is missing angular momentum (A)";if(!("_c"in this))throw"Orbit is missing pericenter (c)";if(!("_C"in this))throw"Orbit is missing apocenter (C)";if(0>this._e)throw"Negative eccentricity is invalid";if(1<this._e)throw"Eccentricity must not be hyperbolic (> 1)";if(1==this._e)throw"Eccentricity must not be parabolic (== 1)";
if(a&&!("_m"in this))throw"Orbit is missing true anomaly (m)";if(a&&!("_B"in this))throw"Orbit is missing radial velocity (B)";if(a&&!("_E"in this))throw"Orbit is missing eccentric anomaly (E)";};a.requireElements=function(a){this.updateElements(a);this.checkElements(a);return this};a.updateElements=function(a){if(this.elements)return this;this.elements=!0;if("_r"in this&&"_v"in this){var b=this._r,d=this._v,f=this._G,c=b.length();this._A3=b.clone().cross(d);this._A2=this._A3.lengthSq();this._A=Math.sqrt(this._A2);
this._B=b.dot(d)/c;var p=this._e3=b.clone().multiplyScalar(d.lengthSq()-f/c).sub(d.clone().multiplyScalar(c*this._B)).multiplyScalar(1/f),d=p.lengthSq(),d=this._e=Math.sqrt(d);this._i=Math.acos(this._A3.z/this._A);this._l=this._A2/f;this._c=this._l/(1+d);this._C=this._l/(1-d);this._a=(this._C+this._c)/2;var f=-this._A3.y,q=+this._A3.x,g=Math.sqrt(f*f+q*q),l=0==g?0:Math.acos(f/g);this._O=0>q?e-l:l;l=f*p.x+q*p.y;this._w=0===g||0===d?0:Math.acos(l/g/d);0>p.z&&(this._w*=-1);b=0===d&&0===g?Math.acos(b.x/
c):0===d?Math.acos((f*b.x+q*b.y)/(g*c)):Math.acos((p.x*b.x+p.y*b.y+p.z*b.z)/d/c);b=this._m=0>this._B?e-b:b;b=this._E=CYCLE(Math.atan2(Math.sqrt(1-d*d)*Math.sin(b),d+Math.cos(b)));this._M=b-d*Math.sin(b)}"_k"in this&&"_h"in this&&(this._W=Math.atan2(this._h,this._k),this._e=this._h/Math.sin(this._W));"_q"in this&&"_p"in this&&(this._O=Math.atan2(this._p,this._q),this._i=2*Math.asin((this._p-this._q)/(-Math.sqrt(2)*Math.sin(h/4-this._O))));"_n"in this&&!("_a"in this)&&(this._a=Math.cbrt(this._G/this._n/
this._n));"_P"in this&&!("_a"in this)&&(d=this._P/e,this._a=Math.cbrt(this._G*d*d));"_a"in this||("_c"in this&&"_C"in this?this._a=(this._C+this._c)/2:"_e"in this&&"_C"in this?this._a=this._C/(1+this._e):"_c"in this&&"_e"in this&&(this._a=this._c/(1-this._e)));"_e"in this||("_c"in this&&"_C"in this?this._e=1-this._c/this._a:"_a"in this&&"_C"in this?this._e=this._C/this._a-1:"_c"in this&&"_a"in this&&(this._e=1-this._c/this._a));"_e"in this?(d=1-this._e*this._e,"_a"in this?(this._l=this._a*d,this._b=
Math.sqrt(this._a*this._l)):"_b"in this?(this._a=this._b/Math.sqrt(d),this._l=this._a*d):"_l"in this&&(this._a=this._l/d,this._b=Math.sqrt(this._a*this._l))):"_a"in this?"_b"in this?(this._l=this._b*this._b/this._a,this._e=Math.sqrt(1-this._l/this._a)):"_l"in this&&(this._e=Math.sqrt(1-this._l/this._a),this._b=Math.sqrt(this._a*this._l)):"_b"in this&&"_l"in this&&(this.a=this._b*this._b/this._l,this._e=Math.sqrt(1-this._l/this._a));"_a"in this&&!("_P"in this)&&(this._P=e/Math.sqrt(this._G)*Math.pow(this._a,
1.5));"_P"in this&&!("_n"in this)&&(this._n=e/this._P);"_P"in this&&!("_A"in this)&&"_a"in this&&"_b"in this&&(this._A=e*this._a*this._b/this._P);"_a"in this&&"_e"in this&&("_c"in this||(this._c=this._a*(1-this._e)),"_C"in this||(this._C=this._a*(1+this._e)));if("_L"in this)if("_M"in this)this._W=this._L-this._M,"_O"in this?this._w=this._W-this._O:"_w"in this&&(this._O=this._W-this._w);else if("_W"in this)this._M=this._L-this._W,"_O"in this?this._w=this._W-this._O:"_w"in this&&(this._O=this._W-this._w);
else if("_O"in this&&"_w"in this)this._W=this._O+this._w,this._M=this._L-this._W;else throw"Orbit incomplete";else if("_O"in this)if("_w"in this)this._W=this._O+this._w,"_M"in this&&(this._L=this._M+this._W);else if("_W"in this)this._w=this._W-this._O,"_M"in this&&(this._L=this._M+this._W);else throw"Orbit incomplete";else"_M"in this&&"_w"in this&&"_W"in this&&(this._L=this._W+this._M,this._O=this._W-this._w);a&&this.m();"_W"in this&&(this._W=TURN(this._W));"_L"in this&&(this._L=CYCLE(this._L));"_M"in
this&&(this._M=CYCLE(this._M));"_O"in this&&(this._O=CYCLE(this._O));"_w"in this&&(this._w=TURN(this._w));"_M"in this&&(this._T=-this._M/this._n);return this};a.E=function(a){if("_E"in this&&!a)return this._E;var b=this._e,d=this._m,c=this._M;if(!a&&null!=b&&null!=d)return this._E=CYCLE(Math.atan2(Math.sqrt(1-b*b)*Math.sin(d),b+Math.cos(d)));if(null!=b&&null!=c){a&&(c=CYCLE(this._n*(a-this._T-this._t)));var d=.8>b?c:h;var f=1;for(var e=0;1E-12<Math.abs(f)&&12>e;++e){f=c-d+b*Math.sin(d);var q=b*Math.cos(d)-
1;f/=q;d-=f}d=CYCLE(d);a||(this._E=d);return d}throw"Invalid orbital state";};a.m=function(a){if(0===arguments.length){if("_m"in this)return this._m;var b=this.E()/2;return this._m=CYCLE(2*Math.atan2(Math.sqrt(1+this._e)*Math.sin(b),Math.sqrt(1-this._e)*Math.cos(b)))}return CYCLE(2*Math.atan2(Math.sqrt(1+this._e)*Math.sin(a/2),Math.sqrt(1-this._e)*Math.cos(a/2)))};a.B=function(){if("_B"in this)return this._B;var a=this.r(),b=this.v();return this._B=a.dot(b)/a.length()};a.e3=function(){if("_e3"in this)return this._e3;
var a=this.r(),b=this.v();if(null!==a&&null!==b)return this._e3=a.clone().multiplyScalar(b.lengthSq()-this._G/a.length()).sub(b.clone().multiplyScalar(a.length()*this.B())).multiplyScalar(1/this._G)};a.i=function(){return this._i};a.e=function(){return this._e};a.a=function(){return this._a};a.b=function(){return this._b};a.l=function(){return this._l};a.C=function(){return this._C};a.c=function(){return this._c};a.L=function(){return this._L};a.O=function(){return this._O};a.w=function(){return this._w};
a.T=function(){return this._T};a.W=function(){return this._W};a.n=function(){return this._n};a.A=function(){return this._A};a.M=function(){return this._M};a.P=function(){return this._P};a.q=function(){return"_q"in this?this._q:this._q=Math.cos(this._O)*Math.sin(this._i/2)};a.p=function(){return"_p"in this?this._p:this._p=Math.sin(this._O)*Math.sin(this._i/2)};a.k=function(){return"_k"in this?this._k:this._k=this._e*Math.cos(this._W)};a.h=function(){return"_h"in this?this._h:this._h=this._e*Math.sin(this._W)};
a.update=function(a){this.elements||this.resolveElements(!0);this._M=CYCLE(this._n*(a-this._T));this._L=CYCLE(this._M+this._W);delete this._E;delete this._m;delete this._r;delete this._v;return this};a.state=function(a){this.elements||this.resolveElements(!0);a=a||0;if(!a&&"_r"in this&&"_v"in this)return{r:this._r,v:this._v,time:a,orbit:this};var b=this._e,d=this._a,c=this._i,f=this._O,e=this._w,h=this.E(a),g=this.m(h),l=d*(1-b*Math.cos(h)),n=Math.sqrt(this._G*d)/l,d=l*Math.cos(g),l=l*Math.sin(g),
g=n*-Math.sin(h),b=n*Math.sqrt(1-b*b)*Math.cos(h),n=Math.sin(f),m=Math.cos(f),f=Math.sin(c),k=Math.cos(c),t=Math.sin(e),u=Math.cos(e),e=u*m-t*n*k,c=u*n+t*m*k,h=u*n*k+t*m,n=u*m*k-t*n,m=t*f,f=u*f,l=new Vector3(d*e-l*h,d*c+l*n,d*m+l*f),d=new Vector3(g*e-b*h,g*c+b*n,g*m+b*f);a||(this._r=l,this._v=d);return{r:l,v:d,time:a,orbit:this}};a.r=function(a){return this.state(a).r};a.v=function(a){return this.state(a).v};a.inclination=a.i;a.eccentricity=a.e;a.semiMajorAxis=a.a;a.semiMinorAxis=a.b;a.semilatusRectum=
a.l;a.meanLongitude=a.L;a.ascendingNode=a.O;a.argOfPericenter=a.w;a.timeOfPericenter=a.T;a.longitudeOfPericenter=a.W;a.meanMotion=a.n;a.meanAnomaly=a.M;a.orbitalPeriod=a.P;a.angularMomentum=a.A;a.trueAnomaly=a.m;a.radialVelocity=a.B;a.eccentricAnomaly=a.E;a.apoapsis=a.C;a.aphelion=a.C;a.apocenter=a.C;a.periapsis=a.c;a.perhelion=a.c;a.pericenter=a.c;a.position=a.r;a.velocity=a.v;b.Orbit=b.Orbital=c})(this);"use strict";(function(b){function c(a){a=f(a);for(var b=JD2J2K(a)/100,d=b*b,c=d*b,v=p+q*b+g*
d+l*c,O=n+m*b+x*d+t*c,e=u+C*b+y*d+D*c,L=E+w*b+G*d+F*c,K=H+I*b+z*d+A*c,B=a=0,M,N,J,r=0;r<k.length;r++)M=k[r][0]+k[r][1]*b,N=k[r][2]+k[r][3]*b,J=h[r][0]*v+h[r][1]*O+h[r][2]*e+h[r][3]*L+h[r][4]*K,a+=M*Math.sin(J),B+=N*Math.cos(J);b=(23+26/60+21.448/3600-46.815/3600*b-5.9E-4/3600*d+.001813/3600*c)*DEG2RAD;a/=36E6/DEG2RAD;B/=36E6/DEG2RAD;return{longitude:TURN(a),obliquity:TURN(B),ecliptic:CYCLE(b)}}function a(a){if(2067314.5>a)return a=(a-2067314.5)/36525,1830-405*a+46.5*a*a;if(2067314.5<=a&&2305447.5>
a)return a=(a-2396758.5)/36525,22.5*a*a;if(2312752.5<=a&&2448622.5>a){var b=Math.floor((a-2312752.5)/730.5);b>d.length-2&&(b=d.length-2);var c=d[b+1]-d[b],v=d[b+2]-d[b+1];a=(a-(2312752.5+730.5*b))/730.5;return d[b+1]+a/2*(c+v+a*(c-v))}if(2448622.5<=a&&2455197.5>=a)return b=[56.86,63.83,70],c=b[1]-b[0],v=b[2]-b[1],a=(a-2451544.5)/3652.5,b[1]+a/2*(c+v+a*(v-c));a-=2382148;return-15+a*a/41048480}function f(b){return b+a(b)/JD2SEC}function e(a){var b=JD2J2K(a)/100;return CYCLE(v+K*(a-2451545)+L*b*b+B*
b*b*b)}var d=[124,115,106,98,91,85,79,74,70,65,62,58,55,53,50,48,46,44,42,40,37,35,33,31,28,26,24,22,20,18,16,14,13,12,11,10,9,9,9,9,9,9,9,9,10,10,10,10,10,11,11,11,11,11,11,11,12,12,12,12,12,12,13,13,13,13,14,14,14,15,15,15,15,16,16,16,16,16,17,17,17,17,17,17,17,17,16,16,15,14,13.7,13.1,12.7,12.5,12.5,12.5,12.5,12.5,12.5,12.3,12,11.4,10.6,9.6,8.6,7.5,6.6,6,5.7,5.6,5.7,5.9,6.2,6.5,6.8,7.1,7.3,7.5,7.7,7.8,7.9,7.5,6.4,5.4,2.9,1.6,-1,-2.7,-3.6,-4.7,-5.4,-5.2,-5.5,-5.6,-5.8,-5.9,-6.2,-6.4,-6.1,-4.7,-2.7,
0,2.6,5.4,7.7,10.5,13.4,16,18.2,20.2,21.2,22.4,23.5,23.9,24.3,24,23.9,23.9,23.7,24,24.3,25.3,26.2,27.3,28.2,29.1,30,30.7,31.4,32.2,33.1,34,35,36.5,38.3,40.2,42.2,44.5,46.5,48.5,50.5,52.2,53.8,54.9,55.8,56.9,58.3],h=[[0,0,0,0,1],[-2,0,0,2,2],[0,0,0,2,2],[0,0,0,0,2],[0,1,0,0,0],[0,0,1,0,0],[-2,1,0,2,2],[0,0,0,2,1],[0,0,1,2,2],[-2,-1,0,2,2],[-2,0,1,0,0],[-2,0,0,2,1],[0,0,-1,2,2],[2,0,0,0,0],[0,0,1,0,1],[2,0,-1,2,2],[0,0,-1,0,1],[0,0,1,2,1],[-2,0,2,0,0],[0,0,-2,2,1],[2,0,0,2,2],[0,0,2,2,2],[0,0,2,0,0],
[-2,0,1,2,2],[0,0,0,2,0],[-2,0,0,2,0],[0,0,-1,2,1],[0,2,0,0,0],[2,0,-1,0,1],[-2,2,0,2,2],[0,1,0,0,1],[-2,0,1,0,1],[0,-1,0,0,1],[0,0,2,-2,0],[2,0,-1,2,1],[2,0,1,2,2],[0,1,0,2,2],[-2,1,1,0,0],[0,-1,0,2,2],[2,0,0,2,1],[2,0,1,0,0],[-2,0,2,2,2],[-2,0,1,2,1],[2,0,-2,0,1],[2,0,0,0,1],[0,-1,1,0,0],[-2,-1,0,2,1],[-2,0,0,0,1],[0,0,2,2,1],[-2,0,2,0,1],[-2,1,0,2,1],[0,0,1,-2,0],[-1,0,1,0,0],[-2,1,0,0,0],[1,0,0,0,0],[0,0,1,2,0],[0,0,-2,2,2],[-1,-1,1,0,0],[0,1,1,0,0],[0,-1,1,2,2],[2,-1,-1,2,2],[0,0,3,2,2],[2,-1,
0,2,2]],k=[[-171996,-174.2,92025,8.9],[-13187,-1.6,5736,-3.1],[-2274,-.2,977,-.5],[2062,.2,-895,.5],[1426,-3.4,54,-.1],[712,.1,-7,0],[-517,1.2,224,-.6],[-386,-.4,200,0],[-301,0,129,-.1],[217,-.5,-95,.3],[-158,0,0,0],[129,.1,-70,0],[123,0,-53,0],[63,0,0,0],[63,.1,-33,0],[-59,0,26,0],[-58,-.1,32,0],[-51,0,27,0],[48,0,0,0],[46,0,-24,0],[-38,0,16,0],[-31,0,13,0],[29,0,0,0],[29,0,-12,0],[26,0,0,0],[-22,0,0,0],[21,0,-10,0],[17,-.1,0,0],[16,0,-8,0],[-16,.1,7,0],[-15,0,9,0],[-13,0,7,0],[-12,0,6,0],[11,0,
0,0],[-10,0,5,0],[-8,0,3,0],[7,0,-3,0],[-7,0,0,0],[-7,0,3,0],[-7,0,3,0],[6,0,0,0],[6,0,-3,0],[6,0,-3,0],[-6,0,3,0],[-6,0,3,0],[5,0,0,0],[-5,0,3,0],[-5,0,3,0],[-5,0,3,0],[4,0,0,0],[4,0,0,0],[4,0,0,0],[-4,0,0,0],[-4,0,0,0],[-4,0,0,0],[3,0,0,0],[-3,0,0,0],[-3,0,0,0],[-3,0,0,0],[-3,0,0,0],[-3,0,0,0],[-3,0,0,0],[-3,0,0,0]],p=297.85036*DEG2RAD,q=445267.11148*DEG2RAD,g=-.0019142*DEG2RAD,l=DEG2RAD/189474,n=357.52772*DEG2RAD,m=35999.05034*DEG2RAD,x=-.0086972*DEG2RAD,t=-DEG2RAD/3E5,u=134.96298*DEG2RAD,C=477198.867398*
DEG2RAD,y=.0086972*DEG2RAD,D=DEG2RAD/56250,E=93.27191*DEG2RAD,w=483202.017538*DEG2RAD,G=-.0036825*DEG2RAD,F=DEG2RAD/327270,H=125.04452*DEG2RAD,I=-1934.136261*DEG2RAD,z=.0020708*DEG2RAD,A=DEG2RAD/45E4,v=280.46061837*DEG2RAD,K=360.98564736629*DEG2RAD,L=3.87933E-4*DEG2RAD,B=-DEG2RAD/3871E4;b.JD2JDE=f;b.JDE2JD=function(b){return b-a(b)/JD2SEC};b.getMeanSiderealTime=e;b.getApparentSiderealTime=function(a){var b=c(a);return e(a)+b.longitude/1*Math.cos(b.obliquity)};b.getNutation=c})(this);"use strict";
(function(b){function c(){return{p:this.p,l:this.l,z:this.z}}function a(){return{x:this.x,y:this.y,z:this.z}}function e(){return{l:this.l,b:this.b,i:this.i,r:this.r}}function k(){this.r=Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z);this.i=Math.acos(this.z/this.r);this.b=h/2-this.i;this.l=Math.atan2(this.y,this.x);return(this.sph=e).call(this)}function d(){var b=this.r*Math.sin(this.i);this.x=b*Math.cos(this.l);this.y=b*Math.sin(this.l);this.z=this.r*Math.cos(this.i);return(this.cart=a).call(this)}
function w(){this.p=Math.sqrt(this.x*this.x+this.y*this.y);this.l=Math.atan2(this.y,this.x);return(this.cyl=c).call(this)}function y(){this.x=this.p*Math.cos(this.l);this.y=this.p*Math.sin(this.l);return(this.cart=a).call(this)}function p(){this.i=Math.atan2(this.p,this.z);this.b=h/2-this.i;this.r=Math.sqrt(this.p*this.p+this.z*this.z);return(this.sph=e).call(this)}function q(){this.p=this.r*Math.cos(this.b);this.z=this.r*Math.sin(this.b);return(this.cyl=c).call(this)}function g(b){"ra"in b&&(b.l=
b.ra);"dec"in b&&(b.b=b.dec);"dist"in b&&(b.r=b.dist);"x"in b&&"y"in b&&"z"in b?(this.x=b.x,this.y=b.y,this.z=b.z,this.cart=a,this.sph=k,this.cyl=w):"p"in b&&"l"in b&&"z"in b?(this.p=b.p,this.l=b.l,this.z=b.z,this.cart=y,this.sph=p,this.cyl=c):"l"in b&&(this.l=b.l,this.r=b.r||1,"i"in b||"b"in b)&&(this.cart=d,this.sph=e,this.cyl=q,"b"in b?(this.b=b.b,this.i=h/2-this.b):"i"in b&&(this.i=b.i,this.b=h/2-this.i))}g.prototype.ecl2equ=function(a){var b=this.cart(),c=Math.sin(a);a=Math.cos(a);return new g({x:b.x,
y:b.y*a-b.z*c,z:b.z*a+b.y*c})};g.prototype.equ2ecl=function(a){var b=this.cart(),c=Math.sin(a);a=Math.cos(a);return new g({x:b.x,y:b.y*a+b.z*c,z:b.z*a-b.y*c})};var l=32.932*DEG2RAD,n=192.859508*DEG2RAD,m=27.128336*DEG2RAD;g.prototype.gal2equ=function(){var a=this.sph(),b=a.l,c=a.b,a=Math.sin(c),c=Math.cos(c),d=Math.sin(m),e=Math.cos(m),h=c*Math.sin(b-l),f=Math.asin(a*d+h*e);return{l:CYCLE(Math.atan2(c*Math.cos(b-l),a*e-h*d)+n),b:TURN(f)}};g.prototype.equ2gal=function(){var a=this.sph(),b=a.l,c=a.b,
a=Math.sin(c),c=Math.cos(c),d=Math.sin(m),e=Math.cos(m),f=Math.cos(n-b),k=Math.asin(a*d+c*e*f);return{l:CYCLE(l-Math.atan2(Math.sin(n-b),f*d-a/c*e)-h/2),b:TURN(k)}};var x=2306.2181*DEG2RAD,t=1.39656*DEG2RAD,u=1.39E-4*DEG2RAD,C=.30188*DEG2RAD,P=3.44E-4*DEG2RAD,D=.017998*DEG2RAD,E=1.09468*DEG2RAD,Q=6.6E-5*DEG2RAD,G=.018203*DEG2RAD,F=2004.3109*DEG2RAD,H=.8533*DEG2RAD,I=.42665*DEG2RAD,z=2.17E-4*DEG2RAD,A=.041833*DEG2RAD;g.prototype.precess=function(a,b){var c=this.l,d=this.b,e=(a-b)/36E4,f=e*e,k=f*e;
if(e){var g=b/36E4;var l=g*g;var n=(x+t*g-u*l)*e+(E+Q*g)*f+G*k;var m=(x+t*g-u*l)*e+(C-P*g)*f+D*k;g=(F-H*g-z*l)*e-(I+z*g)*f-A*k}else n=x*e+E*f+A*k,m=x*e+C*f+D*k,g=F*e-z*f-A*k;e=Math.cos(d);l=e*Math.cos(c+m);c=e*Math.sin(c+m);m=Math.cos(g)*l-Math.sin(g)*Math.sin(d);g=Math.sin(g)*l+Math.cos(g)*Math.sin(d);n=Math.atan2(c,m)+n;d>.4*h||d<-.4*h?(c=Math.acos(Math.sqrt(c*c+m*m)),0>d&&(c*=-1)):c=Math.asin(g);d={l:CYCLE(n),b:TURN(c)};"r"in this&&(d.r=this.r);return d};b.Coord=g})(this)}).call(this,this);

/* crc: 091126D392ECE4F8AD16BB45725938E6 */
