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
  breakTimerOn: false,
   timer: { minutes: undefined, seconds: undefined },//timer: { minutes: 4, seconds: 0 },//
  seconds: 240,
  timerOn: false
};
export default class App extends Component {
  state = initialState;

  initializeState() {
    this.setState(initialState);
  }

  setTimerLength = async (length, name) => {
    console.log(name)
    await this.setState(prevState => ({ [name]: length }));
    await this.setState({ seconds: this.state.session * 60 });
    if(name === 'session') {
      this.setState(prevState => ({
        timer: this.secondsToMinutes(prevState.seconds) // this.state
      }));
    }
   
  };

  handleReset = () => {
    this.initializeState();
    clearInterval(this.intervalID);
  };

  secondsToMinutes = timerTime => {
    // console.log(timerTime);
    let minutes, seconds;
    if (timerTime % 60 === 0) {
      minutes = Math.floor(timerTime / 60);
      seconds = 0;
    } else {
      minutes = Math.floor(timerTime / 60);
      seconds = Math.ceil(timerTime % 60);
    }

    // const seconds = timerTime - minutes * 60;
    // console.log(minutes)
    // console.log(seconds)
    return { minutes, seconds };
  };

  // tic() {
  //   this.setState(prevState => ({ timerOn: !!prevState.timerOn }));
  //   if(this.state.timerOn) {
  //       this.intervalID = setInterval(async () => {
  //           // await console.log(this.state.timer);
  //           await this.setState({ timer: this.secondsToMinutes(this.state.seconds) });
  //           if (this.state.seconds > 0) {
  //             await this.setState(prevState => ({ seconds: prevState.seconds - 1 }));
  //           } else {
  //             this.setState({ timerOn: false });
  //             clearInterval(this.intervalID);
  //           }
  //           // this.setState({ timer: this.secondsToMinutes(this.state.seconds) });
  //           // console.log(this.state.timer);
  //         }, 1000);
  //   }

  // }

  timerGo = async e => {
    // console.log(e.target);
    await this.setState(prevState => ({ timerOn: !prevState.timerOn }));

    if (this.state.timerOn) {
      // console.log(this.state.timerOn);
      this.intervalID = setInterval(async () => {
        if (this.state.seconds > 0 && this.state.timerOn) {
          // await console.log(this.state.timer);
          await this.setState(prevState => ({
            timer: this.secondsToMinutes(prevState.seconds)
          }));
          // console.log(this.state.timer);
          await this.setState(prevState => ({
            seconds: prevState.seconds - 1
          }));
        } else if (this.state.seconds === 0 && this.state.timerOn) {
          if (this.state.sessionTimerOn) {
            this.setState(prevState => ({
              sessionTimerOn: !prevState.sessionTimerOn, //false,
              seconds: prevState.break * 60,
              // timer: this.secondsToMinutes(this.state.seconds)
            }));
          } else {
            this.setState(prevState => ({
              sessionTimerOn: !prevState.sessionTimerOn,
              seconds: prevState.session * 60,
              // timer: this.secondsToMinutes(this.state.seconds)
            }));
          }

          // this.setState({ timerOn: false });
          // clearInterval(this.intervalID);
        }
      }, 1000);
    }
  };

  render() {
    const { breakTimerOn, sessionTimerOn, timer, timerOn } = this.state;
    return (
      <React.Fragment>
        <div className="app-container">
          <div className="container">
            <h1>Pomodoro clock</h1>
            <img src="pomodoro_favicon.jpg" alt="pomodoro-icon" />
          </div>
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
            timer={timer}
            sessionTimerOn={sessionTimerOn}
            breakTimerOn={breakTimerOn}
          />

          <ControlPanel
            handleReset={this.handleReset}
            timerGo={this.timerGo}
            timerOn={timerOn}
          />
        </div>
        <div>
          <footer>Coded by</footer>
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
