import React from 'react';
import PropTypes from 'prop-types';
import {pathFromBezierCurve} from "../../../utils/formula";


const TopOfHead = (props) => {
    const style = {
        fill: '#ff0000',
        stroke: '#3a9007',
    }

    const baseWith = 40;
    const halfBase = 20;
    const height = 25;

    const cubicBezierCurve = {
        initialAxis: {
            x: -100,
            y: 200,
        },
        initialControlPoint: {
            x: -120,
            y: -height,
        },
        endingControlPoint: {
            x: -90,
            y: -height,
        },
        endingAxis: {
            x: baseWith,
            y: 0,
        },
    };

    return(

        <path
            style={style}
            d={pathFromBezierCurve(cubicBezierCurve)}
        />

    )
}

export default TopOfHead;