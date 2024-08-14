import { useState } from "react";
import { createRoot } from "react-dom/client";
import { v4 as uuidv4 } from "uuid";

//Considering I am lacking the requirements for the project I will leave this as is
const formattedSeconds = (sec: number) =>
  Math.floor(sec / 60) + ":" + ("0" + (sec % 60)).slice(-2);

interface Lap {
  id: string;
  time: number;
}

interface LapProps {
  index: number;
  lap: Lap;
  onDelete: () => void;
}

const Lap = ({ index, lap, onDelete }: LapProps) => (
  <div key={lap.id} className="stopwatch-lap">
    <strong>{index}</strong>/ {formattedSeconds(lap.time)}{" "}
    <button onClick={onDelete}> X </button>
  </div>
);

interface StopwatchProps {
  initialSeconds: number;
}

const Stopwatch = ({ initialSeconds }: StopwatchProps) => {
  // This could either be a one state Object or multiple, I chose multiple for preference
  const [secondsElapsed, setSecondsElapsed] = useState(initialSeconds);
  const [laps, setLaps] = useState<Lap[]>([]);
  const [incrementer, setIncrementer] = useState<number | undefined>();

  const handleStartClick = () => {
    const incrementer = setInterval(
      () => setSecondsElapsed((previous) => previous + 1),
      1000
    );
    setIncrementer(incrementer);
  };

  const handleStopClick = () => {
    clearInterval(incrementer);
    setIncrementer(undefined);
  };

  const handleResetClick = () => {
    clearInterval(incrementer);
    setLaps([]);
    setSecondsElapsed(0);
  };

  const handleLapClick = () => {
    setLaps((previous) => [
      ...previous,
      { id: uuidv4(), time: secondsElapsed },
    ]);
  };

  const handleDeleteClick = (id: string) => {
    setLaps((previous) => previous.filter((lap) => lap.id !== id));
  };

  return (
    <div className="stopwatch">
      <h1 className="stopwatch-timer">{formattedSeconds(secondsElapsed)}</h1>
      {secondsElapsed === 0 || incrementer === undefined ? (
        <button type="button" className="start-btn" onClick={handleStartClick}>
          start
        </button>
      ) : (
        <button type="button" className="stop-btn" onClick={handleStopClick}>
          stop
        </button>
      )}
      {secondsElapsed !== 0 && incrementer !== undefined ? (
        <button type="button" onClick={handleLapClick}>
          lap
        </button>
      ) : null}
      {secondsElapsed !== 0 && incrementer === undefined ? (
        <button type="button" onClick={handleResetClick}>
          reset
        </button>
      ) : null}
      <div className="stopwatch-laps">
        {laps &&
          laps.map((lap, i) => (
            <Lap
              index={i + 1}
              lap={lap}
              onDelete={() => handleDeleteClick(lap.id)}
            />
          ))}
      </div>
    </div>
  );
};

const container = document.getElementById("root");
const root = createRoot(container!);
root.render(<Stopwatch initialSeconds={0} />);
