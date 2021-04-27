import React from "react";
import PropTypes from 'prop-types';
import {gameWidth} from "../../utils/constants";

const StartGame = (props) => {
    const button ={
        x: gameWidth / -2,
        y: -280,
        width: gameWidth,
        height: 200,
        rx: 10,
        ry: 10,
        style: {
            fill: 'transparent',
            cursor: 'pointer',
        },
        onClick: props.onClick,
    }
    const text = {
        textAnchor: 'middle',
        x: 0,
        y: -150,
        style: {
            fontFamily: '"Joti One", cursive',
            fontSize: 60,
            fill: '#e3e3e3',
            cursor: 'pointer',
        },
        onClick: props.onClick,
    }
    return(
        <g filter={'url(#shadow)'}>
            <rect {...button}/>
            <text {...text}>
                Tap to start!
            </text>
        </g>
    )
}

StartGame.propTypes = {
    onClick: PropTypes.func.isRequired,
}

export default StartGame;