import React from "react";
import { formatDate } from "../utils/dateUtils";
import { styles } from "../styles/styles";

const WorkoutHistory = ({ exercise, rowsByDate, currentUser }) => {
  const history = [];
  for (const date in rowsByDate[currentUser]) {
    const rows = rowsByDate[currentUser][date];
    rows.forEach((row) => {
      if (row.exercise === exercise) {
        history.push({
          date,
          sets: row.sets,
          reps: row.reps,
          weight: row.weight,
        });
      }
    });
  }

  // Sort history by date descending
  history.sort((a, b) => new Date(b.date) - new Date(a.date));

  // Get the last 3 records
  const lastThreeRecords = history.slice(0, 3);

  return (
    <div style={styles.historyContainer}>
      <div style={styles.historyTitle}>Last 3 Records for {exercise}:</div>
      {lastThreeRecords.map((entry, index) => (
        <div key={index} style={styles.historyRow}>
          <div>{formatDate(new Date(entry.date))}</div>
          <div style={styles.historyCell}>Sets: {entry.sets}</div>
          <div style={styles.historyCell}>Reps: {entry.reps}</div>
          <div style={styles.historyCell}>Weight: {entry.weight}</div>
        </div>
      ))}
    </div>
  );
};

export default WorkoutHistory;
