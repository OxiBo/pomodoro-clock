import React from "react";

const SessionLength = ({ sessionLength, setSessionLength }) => {
  return (
    <div className="length-container">
      <h2 id="session-label">Session Length</h2>
      <div className="container-small">
        <button
          id="session-increment"
          onClick={() => setSessionLength("increment")}
        >
          <i
            className="fas fa-arrow-circle-up fa-2x"
            id="session-increment"
          ></i>
        </button>
        <p id="session-length">{sessionLength}</p>
        <button
          id="session-decrement"
          onClick={() => setSessionLength("decrement")}
        >
          <i
            className="fas fa-arrow-circle-down fa-2x"
            id="session-decrement"
          ></i>
        </button>
      </div>
    </div>
  );
};

export default SessionLength;
