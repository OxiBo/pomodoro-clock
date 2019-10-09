import React from "react";

const BreakLength = ({ breakLength, setBreakLength }) => {
  return (
    <div className="length-container">
      <h2 id="break-label">Break Length</h2>
      <div className="container-small">
        <button id="break-increment" onClick={() => setBreakLength("increment")}>
          <i className="fas fa-arrow-circle-up fa-2x"></i>
        </button>
        <p id="break-length">{breakLength}</p>
        <button id="break-decrement" onClick={() => setBreakLength("decrement")}>
          <i className="fas fa-arrow-circle-down fa-2x"></i>
        </button>
      </div>
    </div>
  );
};

export default BreakLength;

// arrow up https://fontawesome.com/icons/arrow-circle-up?style=solid
