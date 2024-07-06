import React, { useState } from "react";
import { styles } from "../styles/styles";

const WorkoutTable = ({ currentRows, handleInputChange, handleDeleteRow }) => {
  const [expandedRows, setExpandedRows] = useState({});

  const toggleExpandRow = (key) => {
    setExpandedRows((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  return (
    <div style={styles.table}>
      <div style={styles.tableHeadersWrapper}>
        <div style={styles.expandHeader}></div>
        <div style={styles.headerCell}>Exercise</div>
        <div style={styles.headerCell}>Sets</div>
        <div style={styles.headerGroup}>
          <div style={styles.headerSubCell}>Reps/Weight</div>
        </div>
        <div style={styles.expandHeader}></div>
      </div>

      {currentRows.map((item) => (
        <div key={item.key} style={styles.row}>
          <button
            style={styles.expandButton}
            onClick={() => toggleExpandRow(item.key)}
          >
            |||
          </button>
          <input
            style={styles.cell}
            value={item.exercise}
            onChange={(e) =>
              handleInputChange(item.key, "exercise", e.target.value)
            }
            placeholder="Enter exercise name"
          />
          <input
            type="number"
            style={styles.cell}
            value={item.sets}
            onChange={(e) =>
              handleInputChange(item.key, "sets", e.target.value)
            }
            placeholder="Sets"
          />
          <div style={styles.expandingCellsContainer}>
            {Array.from({ length: item.sets }).map((_, setIndex) => (
              <div
                key={setIndex}
                style={{
                  display:
                    setIndex === 0 || expandedRows[item.key] ? "block" : "none",
                }}
              >
                <input
                  type="number"
                  style={styles.expandingCell}
                  value={item.reps[setIndex] || ""}
                  onChange={(e) =>
                    handleInputChange(
                      item.key,
                      `reps-${setIndex}`,
                      e.target.value
                    )
                  }
                  placeholder="Reps"
                />
                <input
                  type="number"
                  style={styles.expandingCell}
                  value={item.weight[setIndex] || ""}
                  onChange={(e) =>
                    handleInputChange(
                      item.key,
                      `weight-${setIndex}`,
                      e.target.value
                    )
                  }
                  placeholder="Weight"
                />
              </div>
            ))}
          </div>
          <button
            style={styles.deleteButton}
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
