import React, {useEffect} from 'react'
import Sky from "../Sky/Sky";
import Ground from "../Ground/Ground";
import CannonPipe from "../Cannon/CannonPipe/CannonPipe";
import CannonBase from "../Cannon/CannonBase/CannonBase";
import PropTypes from "prop-types";
import CannonBall from "../Cannon/CannonBall/CannonBall";
import CurrentScore from "../CurrentScore/CurrentScore";
import FlyingObject from "../FlyingObject/FlyingObject";
import Heart from "../Heart/Heart";
import StartGame from "../StartGame/StartGame";
import Title from "../Title/Title";
import Login from "../Login/Login";
import { signIn } from 'auth0-web';
import { useAuth0 } from "@auth0/auth0-react";
import Leaderboard from "../LeaderBoard/LeaderBoard";
import TopOfHead from "../AlienHead/TopOfHead/TopOfHead";

const Canvas = (props) => {
    const gameHeight = 1200;
    const viewBox = [window.innerWidth / -2, 100 - gameHeight, window.innerWidth, gameHeight];

    const mainMusic = new Audio('https://zvukipro.com/uploads/files/2020-06/1591861729_derevnja-durakov-soundtrack-kalambur.mp3');

    const lives = [];
    for (let i = 0; i < props.gameState.lives; i++) {
        const heartPosition = {
            x: -180 - (i * 70),
            y: 35
        }
        lives.push(<Heart position={heartPosition} key={i}/>)
    }
    return (
        <svg
            id={'aliens-go-home-canvas'}
            preserveAspectRatio={'xMaxYMax none'}
            onMouseMove={props.trackMouse}
            viewBox={viewBox}
            onClick={props.shoot}
        >
            <defs>
                <filter id={'shadow'}>
                    <feDropShadow dx={'1'} dy={'1'} stdDeviation={'2'}/>
                </filter>
            </defs>
            <Sky/>
            <Ground/>
            {props.gameState.cannonBalls.map(cannonBall => (
                <CannonBall
                    key={cannonBall.id}
                    position={cannonBall.position}
                />
            ))}
            <CannonPipe rotation={props.angle}/>
            <CannonBase/>
            <CurrentScore score={props.gameState.kills}/>
            {!props.gameState.started &&
            <g>
                <StartGame onClick={() => props.startGame()}/>
                <Title/>
                <Leaderboard currentPlayer={props.currentPlayer} authenticate={signIn} leaderboard={props.players}/>
            </g>
            }
            {props.gameState.flyingObjects.map(flyingObject => (
                <FlyingObject position={flyingObject.position} key={flyingObject.id}/>
            ))}
            {lives}
        </svg>
    )
}

Canvas.propTypes = {
    angle: PropTypes.number.isRequired,
    trackMouse: PropTypes.func.isRequired,
    gameState: PropTypes.shape({
        started: PropTypes.bool.isRequired,
        kills: PropTypes.number.isRequired,
        lives: PropTypes.number.isRequired,
        flyingObjects: PropTypes.arrayOf(PropTypes.shape({
            position: PropTypes.shape({
                x: PropTypes.number.isRequired,
                y: PropTypes.number.isRequired
            }).isRequired,
            id: PropTypes.number.isRequired,
        })).isRequired,
    }).isRequired,
    startGame: PropTypes.func.isRequired,
    currentPlayer: PropTypes.shape({
        id: PropTypes.string.isRequired,
        maxScore: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        picture: PropTypes.string.isRequired,
    }),
    players: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.string.isRequired,
        maxScore: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        picture: PropTypes.string.isRequired,
    })),
    shoot: PropTypes.func.isRequired
}

Canvas.defaultProps = {
    currentPlayer: null,
    players: null,
}

export default Canvas;