import React from "react";
import {pathFromBezierCurve} from "../../utils/formula";

const Title = () => {
    const textStyle = {
        fontFamily: '"Joti One", cursive',
        fontSize: 120,
        fill: '#cbca62',
    }
    const aliensLineCurve = {
        initialAxis: {
            x: -190,
            y: -950,
        },
        initialControlPoint: {
            x: 95,
            y: -50,
        },
        endingControlPoint: {
            x: 285,
            y: -50,
        },
        endingAxis: {
            x: 380,
            y: 0,
        },
    };

    const goHomeLineCurve = {
        ...aliensLineCurve,
        initialAxis: {
            x: -200,
            y: -800,
        },
        initialControlPoint: {
            x: 100,
            y: -70,
        },
        endingControlPoint: {
            x: 250,
            y: -70,
        },
        endingAxis: {
            x: 400,
            y: 0,
        },
    };

    return(

            <g filter={'url(#shadow)'}>
                <defs>
                    <path
                        id={'AliensPath'}
                        d={pathFromBezierCurve(aliensLineCurve)}
                        />
                    <path
                        id="GoHomePath"
                        d={pathFromBezierCurve(goHomeLineCurve)}
                    />
                </defs>
                <text {...textStyle}>
                    <textPath xlinkHref={'#AliensPath'}>
                        Aliens
                    </textPath>
                </text>
                <text {...textStyle}>
                    <textPath xlinkHref="#GoHomePath">
                        Attack!
                    </textPath>
                </text>
            </g>

    )
}

export default Title;
