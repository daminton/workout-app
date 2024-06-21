import React, { useState, useEffect } from "react";

const TimerPage = () => {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [reps, setReps] = useState(0);
  const [sets, setSets] = useState(0);

  useEffect(() => {
    let timer;
    if (isRunning) {
      timer = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isRunning]);

  const resetTimer = () => {
    setTime(0);
    setIsRunning(false);
  };

  const incrementReps = () => setReps(reps + 1);
  const decrementReps = () => setReps(reps > 0 ? reps - 1 : 0);

  const incrementSets = () => setSets(sets + 1);
  const decrementSets = () => setSets(sets > 0 ? sets - 1 : 0);

  return (
    <div style={{ textAlign: "center" }}>
      <div style={{ fontSize: "48px", margin: "20px 0" }}>{time}s</div>
      <button onClick={() => setIsRunning(!isRunning)}>
        {isRunning ? "Stop" : "Start"}
      </button>
      <button onClick={resetTimer}>Reset</button>
      <div>
        <h2>Reps: {reps}</h2>
        <button onClick={incrementReps}>+</button>
        <button onClick={decrementReps}>-</button>
      </div>
      <div>
        <h2>Sets: {sets}</h2>
        <button onClick={incrementSets}>+</button>
        <button onClick={decrementSets}>-</button>
      </div>
    </div>
  );
};

export default TimerPage;
