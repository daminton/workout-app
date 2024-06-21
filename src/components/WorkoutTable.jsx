import React from "react";
import { styles } from "../styles/styles";

const WorkoutTable = ({ currentRows, handleInputChange, handleDeleteRow }) => {
  return (
    <div style={styles.table}>
      <div style={styles.tableHeadersWrapper}>
        <div style={{ ...styles.headerCell, ...styles.cell }}>Exercise</div>
        <div style={{ ...styles.headerCell, ...styles.cell }}>Sets</div>
        <div style={{ ...styles.headerCell, ...styles.cell }}>Reps</div>
        <div style={{ ...styles.headerCell, ...styles.cell }}>Weight</div>
        <div style={{ ...styles.headerCell, ...styles.cell }}></div>
      </div>

      {currentRows.map((item) => (
        <div key={item.key} style={styles.row}>
          <input
            style={styles.cell}
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
      ))}
    </div>
  );
};

export default WorkoutTable;
