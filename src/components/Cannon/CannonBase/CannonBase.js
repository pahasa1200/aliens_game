import React from "react";
import {pathFromBezierCurve} from "../../../utils/formula";

const CannonBase = (props) => {
    const cannonBaseStyle = {
        fill: '#a16012',
        stroke: '#75450e',
        strokeWidth: '2px',
    }
    const baseWith = 80;
    const halfBase = 40;
    const height = 60;
    const negativeHeight = height * -1;

    const cubicBeizerCurve = {
        initialAxis: {
            x: -halfBase,
            y: height,
        },
        initialControlPoint: {
            x: 20,
            y: negativeHeight,
        },
        endingControlPoint: {
            x: 60,
            y: negativeHeight,
        },
        endingAxis: {
            x: baseWith,
            y: 0,
        },
    }
    return(
        <g>
            <path
                style={cannonBaseStyle}
                d={pathFromBezierCurve(cubicBeizerCurve)}
            />
            <line
                x1={-halfBase}
                y1={height}
                x2={halfBase}
                y2={height}
                style={cannonBaseStyle}
                />
        </g>
    )
}

export default CannonBase;