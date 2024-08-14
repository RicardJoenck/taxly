// No need to import the whole react library if only component and classAttributes is being used
// import * as React from "react";
import * as ReactDOM from "react-dom";
import { Component, ClassAttributes } from "react";

// I might be overthinking this one, but this is not necessarily wrong, it really depends on the requirements
// if we are meant to show numbers past 60 minutes this will certainly not work e.g. 01:00:00, but if that's the case we would also need to know what to do with time past 24/99 hours for example.
const formattedSeconds = (sec: number) =>
  Math.floor(sec / 60) + ":" + ("0" + (sec % 60)).slice(-2);

interface StopwatchProps extends ClassAttributes<Stopwatch> {
  initialSeconds: number;
}

interface StopwatchState {
  secondsElapsed: number;
  lastClearedIncrementer?: number;
}

/* A bit of a general recommendation, but we are not using typescript to its full capabilities with the anys
  to list changes:
  1. Created StopWatchState
  2. Added to Component<StopwatchProps, any>
  3. defined incrementer and laps types (setInterval can either be NodeJS.Timer or number depending on the overloaded function so opted for number as we want the ID to clear it)
*/
class Stopwatch extends Component<StopwatchProps, StopwatchState> {
  incrementer: number | undefined;
  laps: number[];

  constructor(props: StopwatchProps) {
    super(props);
    // considering incrementer can be either number or undefined, I altered the state to have lastClearedIncrementer as optional to align with clearInterval's signature
    this.state = {
      // https://legacy.reactjs.org/docs/react-component.html#constructor common mistake see note section
      secondsElapsed: this.props.initialSeconds,
    };
    // I would bring this to the state to leverage react's inner workings to define if the component should re-render or not.
    this.laps = [];
  }

  handleStartClick() {
    this.incrementer = setInterval(
      () =>
        // Since setState is an async function its better use react's knowledge of the previous state for incrementing values, otherwise it might batch update the values
        // I am not sure about the class state management, but in hooks the state before was completely overwriting the value rather than just updating seconds for example
        // I altered the logic to keep both values instead
        this.setState((previousvalue) => {
          return {
            ...previousvalue,
            secondsElapsed: previousvalue.secondsElapsed + 1,
          };
        }),
      1000
    );
  }

  handleStopClick() {
    clearInterval(this.incrementer);
    // same as above
    this.setState((previousvalue) => {
      return {
        ...previousvalue,
        lastClearedIncrementer: this.incrementer,
      };
    });
  }

  handleResetClick() {
    clearInterval(this.incrementer);
    // I almost oversaw this minor issue due to prettier
    // using , instead of ;
    this.laps = [];
    this.setState({
      secondsElapsed: 0,
    });
  }

  // Typo here, should be handleLapClick instead of lab
  handleLapClick() {
    //rather than having this outside of the state I would include it, so the forceUpdate would not be necessary
    this.laps = this.laps.concat([this.state.secondsElapsed]);
    this.forceUpdate();
  }

  handleDeleteClick(index: number) {
    // Although it is working and I am not seeing edge cases, I would view this as bad practice to alter variables in place
    // With the additional recommendation above, I would change this to be setState and use .filter() instead
    return () => this.laps.splice(index, 1);
  }

  render() {
    const { secondsElapsed, lastClearedIncrementer } = this.state;
    return (
      <div className="stopwatch">
        <h1 className="stopwatch-timer">{formattedSeconds(secondsElapsed)}</h1>
        {secondsElapsed === 0 || this.incrementer === lastClearedIncrementer ? (
          <button
            type="button"
            className="start-btn"
            /* The onClicks were missing some way of binding the context, this can be achieved a numerous ways
               I chose this method for the readability and familiarity, but others definitely exist see https://medium.com/@rajwar67/a-guide-to-bind-this-keyword-in-react-js-256c7ee39970
            */
            onClick={this.handleStartClick.bind(this)}
          >
            start
          </button>
        ) : (
          <button
            type="button"
            className="stop-btn"
            // Same as above
            onClick={this.handleStopClick.bind(this)}
          >
            stop
          </button>
        )}
        {secondsElapsed !== 0 && this.incrementer !== lastClearedIncrementer ? (
          // Same as above
          <button type="button" onClick={this.handleLapClick.bind(this)}>
            lap
          </button>
        ) : null}
        {secondsElapsed !== 0 && this.incrementer === lastClearedIncrementer ? (
          // Same as above
          <button type="button" onClick={this.handleResetClick.bind(this)}>
            reset
          </button>
        ) : null}
        <div className="stopwatch-laps">
          {this.laps &&
            // Never use index for keys, the documentation explains best here https://react.dev/learn/rendering-lists#why-does-react-need-keys in the pitfall section
            this.laps.map((lap, i) => (
              <Lap
                index={i + 1}
                lap={lap}
                onDelete={this.handleDeleteClick(i).bind(this)}
              />
            ))}
        </div>
      </div>
    );
  }
}
/*
  I would alter this component slightly to fix the issue related to the index being used as key.
  Rather then lap being a number array, I would make it an array of object so we could have and object like so { id: number, time: number }
  This way we would have control over the key and avoid re-render issues with the ever mutating index
*/
// Additional point, I believe the onDelete type is also wrong, it has no return so it should be () => void instead
const Lap = (props: { index: number; lap: number; onDelete: () => {} }) => (
  <div key={props.index} className="stopwatch-lap">
    <strong>{props.index}</strong>/ {formattedSeconds(props.lap)}{" "}
    <button onClick={props.onDelete}> X </button>
  </div>
);
//I don't think this was part of the exercise but ReactDOM.Render is now deprecated in react's latest version, we should use createRoot's render function instead
// see https://react.dev/blog/2022/03/08/react-18-upgrade-guide#updates-to-client-rendering-apis
ReactDOM.render(
  <Stopwatch initialSeconds={1000000000} />,
  // usually the id is root not content, however, this might be by design
  document.getElementById("root")
);
