import React, { useState, useEffect } from "react";
import { styles } from "../styles/styles";

const WorkoutTable = ({
  currentRows,
  handleInputChange,
  handleDeleteRow,
  rowsByDate,
  currentUser,
}) => {
  const [volumeChanges, setVolumeChanges] = useState({});

  useEffect(() => {
    const changes = {};
    currentRows.forEach((item) => {
      const lastVolume = getLastVolume(item.exercise);
      const sets = parseInt(item.sets);
      const reps = parseInt(item.reps);
      const weight = parseFloat(item.weight);
      const currentVolume = calculateCurrentVolume(sets, reps, weight);

      changes[item.key] =
        lastVolume === null || currentVolume > lastVolume ? "green" : "red";
    });
    setVolumeChanges(changes);
  }, [currentRows, rowsByDate, currentUser]);

  const getLastVolume = (exercise) => {
    const historicalData = rowsByDate[currentUser] || {};
    let lastVolume = null;

    // Find the last recorded volume for the exercise, assuming dates are in chronological order
    const sortedDates = Object.keys(historicalData).sort(
      (a, b) => new Date(a) - new Date(b)
    );
    for (let i = sortedDates.length - 1; i >= 0; i--) {
      const date = sortedDates[i];
      const rows = historicalData[date];
      for (const row of rows) {
        if (row.exercise === exercise) {
          const sets = parseInt(row.sets);
          const reps = parseInt(row.reps);
          const weight = parseFloat(row.weight);
          let volume = 0;
          if (weight === 0) {
            volume = sets * reps;
          } else {
            volume = sets * reps * weight;
          }
          if (lastVolume !== null) {
            return volume; // Return the last volume found
          }
          lastVolume = volume;
        }
      }
    }

    return lastVolume;
  };

  const calculateCurrentVolume = (sets, reps, weight) => {
    let currentVolume = 0;
    if (!isNaN(sets) && !isNaN(reps) && !isNaN(weight)) {
      if (weight === 0) {
        currentVolume = sets * reps;
      } else {
        currentVolume = sets * reps * weight;
      }
    }
    return currentVolume;
  };

  return (
    <div style={styles.table}>
      <div style={styles.tableHeadersWrapper}>
        <div style={{ ...styles.headerCell, ...styles.cell }}>Exercise</div>
        <div style={{ ...styles.headerCell, ...styles.cell }}>Sets</div>
        <div style={{ ...styles.headerCell, ...styles.cell }}>Reps</div>
        <div style={{ ...styles.headerCell, ...styles.cell }}>Weight</div>
        <div style={{ ...styles.headerCell, ...styles.cell }}></div>
      </div>

      {currentRows.map((item) => {
        const backgroundColor = volumeChanges[item.key] || "white"; // Default to white if no change detected

        return (
          <div key={item.key} style={styles.row}>
            <input
              style={{
                flex: 1,
                padding: 8,
                width: "60px",
                border: "1px solid #ccc",
                boxSizing: "border-box",
                backgroundColor: backgroundColor,
              }}
              value={item.exercise}
              onChange={(e) =>
                handleInputChange(item.key, "exercise", e.target.value)
              }
              placeholder="Enter exercise name"
            />
            <input
              style={styles.cell}
              value={item.sets}
              onChange={(e) =>
                handleInputChange(item.key, "sets", e.target.value)
              }
              placeholder="Sets"
            />
            <input
              style={styles.cell}
              value={item.reps}
              onChange={(e) =>
                handleInputChange(item.key, "reps", e.target.value)
              }
              placeholder="Reps"
            />
            <input
              style={styles.cell}
              value={item.weight}
              onChange={(e) =>
                handleInputChange(item.key, "weight", e.target.value)
              }
              placeholder="Weight"
            />
            <button
              style={{ ...styles.deleteButton, ...styles.cell }}
              onClick={() => handleDeleteRow(item.key)}
            >
              Delete
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default WorkoutTable;
