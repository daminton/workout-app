import React, { useRef, useState } from "react";
import { ModeToggle } from "./mode-toggle";

const SettingsPage = ({
  workoutName,
  setWorkoutName,
  saveWorkout,
  loadWorkout,
  deleteWorkout,
  updateWorkout,
  savedWorkouts,
  exportWorkoutHistory,
  importWorkoutHistory,
}) => {
  const fileInputRef = useRef(null);
  const [selectedWorkout, setSelectedWorkout] = useState("");

  const handleImportClick = () => {
    fileInputRef.current.click();
  };

  return (
    <div style={{ padding: "20px" }}>
      <ModeToggle />
      <div>
        <h2>Workout Options</h2>
        <input
          type="text"
          placeholder="Workout Name"
          value={workoutName}
          onChange={(e) => setWorkoutName(e.target.value)}
        />
        <button onClick={() => saveWorkout(workoutName)}>Save Workout</button>
        <select
          value={selectedWorkout}
          onChange={(e) => setSelectedWorkout(e.target.value)}
        >
          <option value="">Select Workout</option>
          {Object.keys(savedWorkouts).map((name) => (
            <option key={name} value={name}>
              {name}
            </option>
          ))}
        </select>
        <button onClick={() => loadWorkout(selectedWorkout)}>
          Load Workout
        </button>
        <button onClick={() => updateWorkout(selectedWorkout)}>
          Update Workout
        </button>
        <button onClick={() => deleteWorkout(selectedWorkout)}>
          Delete Workout
        </button>
      </div>
      <div style={{ marginTop: "20px" }}>
        <button onClick={exportWorkoutHistory}>Export Workout History</button>
      </div>
      <div style={{ marginTop: "20px" }}>
        <input
          type="file"
          ref={fileInputRef}
          style={{ display: "none" }}
          onChange={(e) => importWorkoutHistory(e.target.files[0])}
        />
        <button onClick={handleImportClick}>Import Workout History</button>
      </div>
    </div>
  );
};

export default SettingsPage;
