import React from "react";

const Display = ({
  timer: { minutes = 4, seconds = 0 },
  breakTimerOn,
  sessionTimerOn
}) => {
  // console.log(timer)
  // let { minutes, seconds } = timer;
  // minutes = minutes < 10 ? `0${minutes}` : minutes;
  // seconds = seconds < 10 ? `0${seconds}` : seconds;
  const stylesWarning = minutes === 0 ? 'warning': ""; 
  const timerLabel = sessionTimerOn ? "Session" : "Break";
  console.log(`${minutes} ${seconds}`);
  return (
    <div className={`container display ${stylesWarning}`}>
      <h1 id="timer-label">{timerLabel}</h1>
      <p id="time-left">
        {minutes < 10 ? `0${minutes}` : minutes}:
        {seconds < 10 ? `0${seconds}` : seconds}
      </p>
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
