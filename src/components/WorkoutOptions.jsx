import React from "react";
import { styles } from "../styles/styles";

const WorkoutOptions = ({
  workoutName,
  setWorkoutName,
  saveWorkout,
  loadWorkout,
  deleteWorkout,
  updateWorkout,
  savedWorkouts,
}) => {
  return (
    <div style={styles.optionsContainer}>
      <input
        type="text"
        placeholder="Enter Workout Name"
        value={workoutName}
        onChange={(e) => setWorkoutName(e.target.value)}
        style={styles.workoutInput}
      />
      <div style={styles.optionsContainerSaveAndLoad}>
        <button onClick={saveWorkout} style={styles.saveButton}>
          Save Workout
        </button>
        <select
          onChange={(e) => loadWorkout(e.target.value)}
          style={styles.loadSelect}
        >
          <option value="">Load Workout</option>
          {Object.keys(savedWorkouts).map((name) => (
            <option key={name} value={name}>
              {name}
            </option>
          ))}
        </select>
      </div>
      {Object.keys(savedWorkouts).map((name) => (
        <div key={name} style={styles.savedWorkoutContainer}>
          <span>{name}</span>
          <button
            onClick={() => deleteWorkout(name)}
            style={styles.deleteButton}
          >
            Delete
          </button>
          <button
            onClick={() => updateWorkout(name)}
            style={styles.updateButton}
          >
            Update
          </button>
        </div>
      ))}
    </div>
  );
};

export default WorkoutOptions;
