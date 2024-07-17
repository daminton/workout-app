import React from "react";
import { formatDate } from "../utils/dateUtils";
import { styles } from "../styles/styles";

const WorkoutHistory = ({ exercise, rowsByDate, currentUser }) => {
  const history = [];
  for (const date in rowsByDate[currentUser]) {
    const rows = rowsByDate[currentUser][date];
    rows.forEach((row) => {
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

        history.push({
          date,
          sets: row.sets,
          reps: row.reps,
          weight: row.weight,
          volume: volume,
        });
      }
    });
  }

  // Display only the last three instances
  const lastThreeEntries = history.slice(-3);

  return (
    <div style={styles.historyContainer}>
      <div style={styles.historyTitle}>Last 3 Records for {exercise}</div>
      {lastThreeEntries.map((entry, index) => (
        <div key={index} style={styles.historyRow}>
          <div>{formatDate(new Date(entry.date))}</div>
          <div style={styles.historyCell}>Sets: {entry.sets}</div>
          <div style={styles.historyCell}>Reps: {entry.reps}</div>
          <div style={styles.historyCell}>Weight: {entry.weight}</div>
          <div style={styles.historyCell}>Volume: {entry.volume}</div>
        </div>
      ))}
    </div>
  );
};

export default WorkoutHistory;
