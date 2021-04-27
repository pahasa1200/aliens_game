import {calculateAngle} from "../utils/formula";
import createFlyingObjects from "./createFlyingObjects";
import {object} from "prop-types";
import moveBalls from "./moveCannonBalls";
import checkCollisions from "./checkCollisions";
import {useEffect} from "react";


function moveObjects(state, action){
    if (!state.gameState.started) return state;

    let cannonBalls = moveBalls(state.gameState.cannonBalls);

    const mousePosition = action.mousePosition || {
        x: 0,
        y: 0
    }

    const newState = createFlyingObjects(state);

    const now = (new Date()).getTime();
    let flyingObjects = newState.gameState.flyingObjects.filter(object => (
        (now - object.createdAt) < 4000
    ))

    const lostLife = state.gameState.flyingObjects.length > flyingObjects.length;
    let lives = state.gameState.lives;
    if (lostLife){
        lives--;
    }
    const playMusic = async e => {
        const audio = await new Audio("https://zvukipro.com/uploads/files/2019-07/1562136419_40a84da0291a73b.mp3");
         audio.play();
    }
    const mainMusicPlay = async (e, type = 1) => {
        const audio = await new Audio("https://zvukipro.com/uploads/files/2020-06/1591861729_derevnja-durakov-soundtrack-kalambur.mp3");
        if (type == 0){
            audio.pause();
        }
        else {audio.play()}
    }

    const started =  lives > 0;
        if (!started){
            flyingObjects = [];
            cannonBalls = [];
            lives = 3;
            playMusic()
            mainMusicPlay(null,0)
        }



    const {x , y} = mousePosition;
    const angle = calculateAngle(0 , 0, x, y);
    const objectsDestroyed = checkCollisions(cannonBalls, flyingObjects);
    const cannonBallsDestroyed = objectsDestroyed.map(object => (object.cannonBallId));
    const flyingDiscsDestroyed = objectsDestroyed.map(object => (object.flyingDiscId));

    cannonBalls = cannonBalls.filter(cannonBall => (cannonBallsDestroyed.indexOf(cannonBall.id)));
    flyingObjects = flyingObjects.filter(flyingDisc => (flyingDiscsDestroyed.indexOf(flyingDisc.id)));

    const kills = state.gameState.kills + flyingDiscsDestroyed.length;

    return {
        ...newState,
        gameState: {
            ...newState.gameState,
            flyingObjects,
            cannonBalls: [...cannonBalls],
            lives,
            started,
            kills
        },
        angle
    }
}

export default moveObjects