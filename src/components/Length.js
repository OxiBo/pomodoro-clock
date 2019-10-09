import React, { useState, useEffect } from "react";

const Length = ({ name, setTimerLength, minutes, timerOn }) => {
  const titleName = name.replace(/^./, str => str.toUpperCase());
  const [length, setLength] = useState(minutes);

  const set = operation => {
    if (timerOn === false) {
      setLength(
        operation === "increment" && length < 60
          ? length + 1
          : operation === "decrement" && length > 1
          ? length - 1
          : length
      );
    }

    // console.log(length);
  };

  // useEffect(() => {
  //   setLength(minutes);
  // }, [minutes]);

  useEffect(() => {
    setTimerLength(length, name);
  }, [length, name, setTimerLength]); //  Line 43:6:  React Hook useEffect has missing dependencies: 'length' and 'setTimerLength'. Either include them or remove the dependency array. If 'setTimerLength' changes too often, find the parent component that defines it and wrap that definition in useCallback  react-hooks/exhaustive-deps
  // i had to add name and setTimerLength in the array and the waring message went away - why?

  return (
    <div className="length-container">
      <h2 id={`${name}-label`}>{`${titleName} Length`}</h2>
      <div className="container-small">
        <button id={`${name}-increment`} onClick={() => set("increment")}>
          <i className="fas fa-arrow-circle-up fa-2x"></i>
        </button>
        <p id={`${name}-length`}>{length}</p>
        <button id={`${name}-decrement`} onClick={() => set("decrement")}>
          <i className="fas fa-arrow-circle-down fa-2x"></i>
        </button>
      </div>
    </div>
  );
};

export default Length;

// arrow up https://fontawesome.com/icons/arrow-circle-up?style=solid

/*


return (
    <div className="length-container">
      <h2 id={`${props.name}-label`}>{`${titleName} Length`}</h2>
      <div className="container-small">
        <button id={`${props.name}-increment`} onClick={(e) => props.setTimerLength("increment", props.name)}>
          <i className="fas fa-arrow-circle-up fa-2x"></i>
        </button>
        <p id={`${props.name}-length`}>some numeber</p>
        <button id={`${props.name}-decrement`} onClick={(e) => props.setTimerLength("decrement", props.name)}>
          <i className="fas fa-arrow-circle-down fa-2x"></i>
        </button>
      </div>
    </div>
  );
};

*/
