import React, { useState, useEffect } from "react";

const Display = ({ seconds, sessionTimerOn }) => {
  const secondsToMinutes = timerTime => {
    let minute, second;
    if (timerTime % 60 === 0) {
      minute = Math.floor(timerTime / 60);
      second = 0;
    } else {
      minute = Math.floor(timerTime / 60);
      second = Math.ceil(timerTime % 60);
    }
    return { minute, second };
  };

  const [timer, setTimer] = useState(secondsToMinutes(seconds));

  useEffect(() => {
    setTimer(secondsToMinutes(seconds));
  }, [seconds]);

  let { minute, second } = timer;
  const stylesWarning = minute === 0 ? "warning" : "";
  minute = minute < 10 ? `0${minute}` : minute;
  second = second < 10 ? `0${second}` : second;

  
  const timerLabel = sessionTimerOn ? "Session" : "Break";
  

  return (
    <div className={`container display ${stylesWarning}`}>
      <h2 id="timer-label">{timerLabel}</h2>
      <p id="time-left">{minute + ":" + second}</p>
    </div>
  );
};

export default Display;

/*

const Display = ({
  timer: { minutes = 4, seconds = 0 },
  breakTimerOn,
  sessionTimerOn
}) => {
  minutes = minutes < 10 ? `0${minutes}` : minutes;
  seconds = seconds < 10 ? `0${seconds}` : seconds;
  const timerLabel = sessionTimerOn ? "Session" : "Break";
console.log(minutes)


*/

/*

Careful: null and undefined
One thing to note here is that this isn’t 100% the same as this old trick used to fallback when settings.speed is not set:

Js
const mySpeed = 0;
const speed = mySpeed || 760; 
console.log(speed); // 760!
Why? Because ES6 destructuring default values only kick in if the value is undefined. null, false and 0 are all still values!
*/
