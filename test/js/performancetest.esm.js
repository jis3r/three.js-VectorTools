import {lineSegmentIntersection, linearFunctionParameters, verifyVerticalLine, verifyIntersectionDistance, verifyIntersectionFactor, calcIntersection} from "../../src/BenchmarkLineSegmentIntersection.js";
import * as THREE from "../../node_modules/three/build/three.module.js";


let rep = 1000000000;

let startP1 = new THREE.Vector3( 3, 2, 0 );
let endP1 = new THREE.Vector3( 5, 4, 0 );

let startP2 = new THREE.Vector3( 6, 1, 0 );
let endP2 = new THREE.Vector3( 2, 5, 0 );

let opt = {
    onlySection: false
};

let sp = new THREE.Vector3( 4, 3, 0);



let test = lineSegmentIntersection( startP1, endP1, startP2, endP2);

verifyIntersectionDistance( startP1, endP1, startP2, endP2, sp );

verifyIntersectionFactor( startP1, endP1, startP2, endP2, sp );



var start2 = performance.now();

for ( let i = 0; i < rep; i++ )
{
    verifyIntersectionFactor( startP1, endP1, startP2, endP2, sp );
}

var time2 = performance.now();
console.log( 'Dauer Factor: ' + (time2 - start2) + ' ms.' );


var start = performance.now();

for ( let i = 0; i < rep; i++ )
{
    verifyIntersectionDistance( startP1, endP1, startP2, endP2, sp );
}

var time = performance.now();
console.log( 'Dauer Distanz: ' + (time - start) + ' ms.' );







console.log( "TestBoolean: ", test );



/*


//Theoretischer Schnittpunkt bei unendlicher Länge:
let startP1 = new THREE.Vector3( 1, 1, 0 );
let endP1 = new THREE.Vector3( 5, 5, 0 );

let startP2 = new THREE.Vector3( 9, 5, 0 );
let endP2 = new THREE.Vector3( 8, 1, 0 );


//Tatsächlicher Schnittpunkt:
let startP1 = new THREE.Vector3( 3, 2, 0 );
let endP1 = new THREE.Vector3( 5, 4, 0 );

let startP2 = new THREE.Vector3( 6, 1, 0 );
let endP2 = new THREE.Vector3( 2, 5, 0 );


//Tatsächlicher Schnittpunkt mit einer senkrechten 1. Geraden:
let startP1 = new THREE.Vector3( 1, -20, 0 );
let endP1 = new THREE.Vector3( 1, 40, 0 );

let startP2 = new THREE.Vector3( -2, 3, 0 );
let endP2 = new THREE.Vector3( 2, 3, 0 );


//Tatsächlicher Schnittpunkt mit einer senkrechten 2. Geraden:
let startP1 = new THREE.Vector3( 1, -20, 0 );
let endP1 = new THREE.Vector3( 1, 40, 0 );

let startP2 = new THREE.Vector3( -2, 3, 0 );
let endP2 = new THREE.Vector3( 2, 3, 0 );



*/