import {independentArrayVectorSection, threeVectorToArray, arrayToThreeVector} from "../../src/independentArrayVectorSection.js";
import * as THREE from "../../node_modules/three/build/three.module.js";

let minLength =25;
let opt = {
    onlySection: false
}

let startVecThree = new THREE.Vector2( 1, 2 );
let endVecThree = new THREE.Vector2( 4, 5 );

let startVec = threeVectorToArray(startVecThree); // [0, 0, 0, 1]
let endVec   = threeVectorToArray(endVecThree); // [0, 0, 0, 2]

let newVec = independentArrayVectorSection( startVec, endVec, minLength, opt );

let test = function( newVec, endVec )
{
    let tempVec = [];
    let length = 0;
    for ( let i = 0; i < endVec.length; i++ ) 
    {
        tempVec.push( endVec[i] - newVec[i] );
        length += tempVec[i] * tempVec[i];
    }

    length = Math.sqrt( length );

    return length;
};

console.log( "Start Vektor(arr)", startVec, "\nEnd Vektor(arr)", endVec );
console.log( "Start Vektor(THREE)", startVecThree, "\nEnd Vektor(THREE)", endVecThree );
console.log( "Neuer Vektor", newVec );
console.log( "\nTest:", test( newVec, endVec ) );
console.log( "\nTestAdapter(arrToVec):", arrayToThreeVector( newVec ) );