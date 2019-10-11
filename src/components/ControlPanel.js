import React from "react";

const ControlPanel = ({ handleReset, timerGo, timerOn }) => {
  return (
    <div className="container controls">
      <button id="start_stop" onClick={timerGo}>
        {timerOn ? (
          <i className="fas fa-pause-circle fa-2x"></i>
        ) : (
          <i className="fas fa-play-circle fa-2x"></i>
        )}
      </button>

      <button id="reset" onClick={() => handleReset()}>
        <i className="fas fa-sync fa-2x"></i>
      </button>
    </div>
  );
};

export default ControlPanel;
