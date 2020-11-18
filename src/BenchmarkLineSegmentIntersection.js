import * as THREE from "../node_modules/three/build/three.module.js";

function linearFunctionParameters ( startP, endP )
{
    let m = ( endP.y - startP.y ) / ( endP.x - startP.x );
    let n = startP.y;
    let t = startP.x * m;

    if ( t <= 0)
    {
        n = n + Math.abs(t);
    }
    else
    {
        n = n - Math.abs(t);
    }

    let parameter = {
        gradient : m,
        constant : n
    };

    return parameter;
}

function verifyVerticalLine(startP, endP)
{
    return startP.x === endP.x;
}


function verifyIntersectionDistance(startL1, endL1, startL2, endL2, intersection)
{
    return ( intersection.distanceTo( startL1 ) + intersection.distanceTo( endL1 ) ) === startL1.distanceTo( endL1 ) 
            && ( intersection.distanceTo( startL2 ) + intersection.distanceTo( endL2 ) ) === startL2.distanceTo( endL2 );
}


function verifyIntersectionFactor(startL1, endL1, startL2, endL2, intersection)
{
    let fx1 = 0;
    let fy1 = 0;
    let fx2 = 0;
    let fy2 = 0;

    fx1 = ( intersection.x - startL1.x ) / ( endL1.x - startL1.x );
    fy1 = ( intersection.y - startL1.y ) / ( endL1.y - startL1.y );

    fx1 = ( intersection.x - startL2.x ) / ( endL2.x - startL2.x );
    fy1 = ( intersection.y - startL2.y ) / ( endL2.y - startL2.y );

    return ( (fx1 <= 1 && fx1 >= 0) && (fy1 <= 1 && fy1 >= 0) && (fx2 <= 1 && fx2 >= 0) && (fy2 <= 1 && fy2 >= 0) );
}


function calcIntersection(parameterL1, parameterL2)
{
    let intersec = new THREE.Vector3(0, 0, 0);

    let x = parameterL1.gradient;
    
    if ( parameterL2.gradient <= 0 )
    {
        x = x + Math.abs(parameterL2.gradient);
    }
    else
    {
        x = x - Math.abs(parameterL2.gradient);
    }

    let y = parameterL2.constant;

    if ( parameterL1.constant <= 0 )
    {
        y = y + Math.abs(parameterL1.constant);
    }
    else
    {
        y = y - Math.abs(parameterL1.constant);
    }

    x = y/x;

    y = parameterL1.gradient * x + parameterL1.constant;


    
    intersec.x = x;
    intersec.y = y;
    
    console.log( "Schnittpunkt", intersec);

    return intersec;
}


function lineSegmentIntersection( startL1, endL1, startL2, endL2) 
{
    startL1 = startL1 || new THREE.Vector3( 0, 0, 0 );
    endL1 = endL1 || new THREE.Vector3( 0, 1, 0 );
    startL2 = startL2 || new THREE.Vector3( -0.5, 0.5, 0 );
    endL2 = endL2 || new THREE.Vector3( 0.5, 0.5, 0 );
    let intersection = new THREE.Vector3(0, 0, 0);

    
    if( verifyVerticalLine(startL1, endL1) )
    {
        if( startL2.x <= endL2.x)
        {
            return startL1.x >= startL2.x && startL1.x <= endL2.x;
        } 
        else
        {
            return startL1.x >= endL2.x && startL1.x <= startL2.x;
        }
    }
    else if( verifyVerticalLine(startL2, endL2) )
    {
        if( startL1.x <= endL1.x)
        {
            return startL2.x >= startL1.x && startL2.x <= endL1.x;
        } 
        else
        {
            return startL2.x >= endL1.x && startL2.x <= startL1.x;
        }
    }
    else
    {
        let parameterL1 = linearFunctionParameters( startL1, endL1 );
        let parameterL2 = linearFunctionParameters( startL2, endL2 );
    
        //console.log("SteigungLinie1", parameterL1.gradient);
    
        //console.log("SteigungLinie2", parameterL2.gradient);
    
        //console.log("ConstanteLinie1", parameterL1.constant);
    
        //console.log("ConstanteLinie2", parameterL2.constant);
    
        
        if ( parameterL1.gradient === parameterL2.gradient ) return false;

        intersection = calcIntersection(parameterL1, parameterL2);
    }

    
        return verifyIntersectionDistance(startL1, endL1, startL2, endL2, intersection);
        return verifyIntersectionFactor(startL1, endL1, startL2, endL2, intersection);
}



export {lineSegmentIntersection, linearFunctionParameters, verifyVerticalLine, verifyIntersectionDistance, verifyIntersectionFactor, calcIntersection};
//export default lineSegmentIntersection;