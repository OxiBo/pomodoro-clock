import React, { Component } from "react";
// import BreakLength from "./BreakLength";
// import SessionLength from "./SessionLength";
import Length from "./Length";
import Display from "./Display";
import ControlPanel from "./ControlPanel";

const initialState = {
  session: 4,
  sessionTimerOn: true,
  break: 2,
  seconds: 240,
  timerOn: false,
  intervalID: false // ????
};

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = initialState;
    this.audioRef = React.createRef();
  }

  componentWillUnmount() {
    if (this.state.intervalID) clearInterval(this.state.intervalID);
    this.setState(() => ({timerOn: false,
      intervalID: false})); // ????

  }

  initializeState() {
    this.setState(initialState);
  }

  setTimerLength = async (length, name) => {
    await this.setState(() => ({ [name]: length }));
    await this.setState(prevState => ({ seconds: prevState.session * 60 }));
  };

  handleReset = () => {
    if (this.state.intervalID) clearInterval(this.state.intervalID);
    this.setState(() => ({timerOn: false,
      intervalID: false}));
    
    // make audio element stop playing when reset button clicked and rewind it to the beginning
    this.audioRef.current.pause();
    this.audioRef.current.currentTime = 0;
    this.initializeState();
  };

  timerGo = async e => {
    await this.setState(prevState => ({ timerOn: !prevState.timerOn }));

    if (this.state.timerOn) {
      const interval = setInterval(() => {
        if (this.state.seconds > 0 && this.state.timerOn) {
          // make audio element play when countdown reaches 0 seconds and rewind it to the beginning
          if (this.state.seconds === 60) {
            this.audioRef.current.currentTime = 0;
            this.audioRef.current.play();
          }
          this.setState(prevState => ({
            seconds: prevState.seconds - 1
          }));
        } else if (this.state.seconds === 0 && this.state.timerOn) {
          if (this.state.sessionTimerOn) {
            this.setState(prevState => ({
              sessionTimerOn: !prevState.sessionTimerOn, //false,
              seconds: prevState.break * 60
            }));
          } else {
            this.setState(prevState => ({
              sessionTimerOn: !prevState.sessionTimerOn,
              seconds: prevState.session * 60
            }));
          }
        }
      }, 1000);
      this.setState({intervalID: interval})
    }
  };

  render() {
    const { sessionTimerOn, timerOn, seconds } = this.state;
    return (
      <React.Fragment>
        <audio
          ref={this.audioRef}
          src="https://goo.gl/65cBl1"
          id="beep"
        ></audio>
        <div className="app-container">
          <header className="container">
            <h1>Pomodoro clock  <hr /></h1>
            <img src="pomodoro_favicon.jpg" alt="pomodoro-icon" />
          </header>
          <div className="container">
            <Length
              setTimerLength={this.setTimerLength}
              name={"break"}
              minutes={this.state.break}
              timerOn={timerOn}
            />
            <Length
              setTimerLength={this.setTimerLength}
              name={"session"}
              minutes={this.state.session}
              timerOn={timerOn}
            />
          </div>

          <Display
            seconds={seconds}
            sessionTimerOn={sessionTimerOn}
          />

          <ControlPanel
            handleReset={this.handleReset}
            timerGo={this.timerGo}
            timerOn={timerOn}
          />
        </div>
        <div>
          <footer>Written and coded by OxiBo, 2019</footer>
        </div>
      </React.Fragment>
    );
  }
}

//   setSessionLength = operation => {
//     this.setState(prevState => ({
//       sessionLength:
//         operation === "increment" && prevState.sessionLength < 60
//           ? prevState.sessionLength + 1
//           : operation === "decrement" && prevState.sessionLength > 1
//           ? prevState.sessionLength - 1
//           : prevState.sessionLength
//     }));
//   };

//   setBreakLength = operation => {
//     this.setState(prevState => ({
//       breakLength:
//         operation === "increment" && prevState.breakLength < 60
//           ? prevState.breakLength + 1
//           : operation === "decrement" && prevState.breakLength > 1
//           ? prevState.breakLength - 1
//           : prevState.breakLength
//     }));
//   };

// {
/* <BreakLength
              breakLength={this.state.break}
              breakTimerOn={breakTimerOn}
              setBreakLength={this.setBreakLength}
            />
            <SessionLength
              sessionLength={sessionLength}
              sessionTimerOn={sessionTimerOn}
              setSessionLength={this.setSessionLength}
            /> */
// }
