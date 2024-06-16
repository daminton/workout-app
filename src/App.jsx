import React, { useState, useEffect } from "react";

const Row = {
  key: "",
  exercise: "",
  sets: "",
  reps: "",
  weight: "",
};

export default function App() {
  const [date, setDate] = useState(new Date());
  const [rowsByDate, setRowsByDate] = useState({});
  const [user, setUser] = useState("");
  const [currentUser, setCurrentUser] = useState("");

  // Load data from localStorage on component mount
  useEffect(() => {
    const storedRows = localStorage.getItem("exerciseRows");
    if (storedRows) {
      setRowsByDate(JSON.parse(storedRows));
    }
  }, []);

  // Save data to localStorage whenever rowsByDate updates
  useEffect(() => {
    localStorage.setItem("exerciseRows", JSON.stringify(rowsByDate));
  }, [rowsByDate]);

  const handlePreviousDate = () => {
    const previousDate = new Date(date);
    previousDate.setDate(date.getDate() - 1);
    setDate(previousDate);
  };

  const handleNextDate = () => {
    const nextDate = new Date(date);
    nextDate.setDate(date.getDate() + 1);
    setDate(nextDate);
  };

  const formatDate = (date) => {
    return date.toLocaleDateString();
  };

  const addRow = () => {
    const currentDate = formatDate(date);
    const userRows = rowsByDate[currentUser] || {};
    const currentRows = userRows[currentDate] || [];
    const newRow = {
      key: `${currentRows.length + 1}`,
      exercise: "",
      sets: "",
      reps: "",
      weight: "",
    };
    setRowsByDate({
      ...rowsByDate,
      [currentUser]: {
        ...userRows,
        [currentDate]: [...currentRows, newRow],
      },
    });
  };

  const handleInputChange = (key, field, value) => {
    const currentDate = formatDate(date);
    const userRows = rowsByDate[currentUser] || {};
    const currentRows = userRows[currentDate] || [];
    const newRows = currentRows.map((row) =>
      row.key === key ? { ...row, [field]: value } : row
    );
    setRowsByDate({
      ...rowsByDate,
      [currentUser]: {
        ...userRows,
        [currentDate]: newRows,
      },
    });
  };

  const handleDeleteRow = (key) => {
    const currentDate = formatDate(date);
    const userRows = rowsByDate[currentUser] || {};
    const currentRows = userRows[currentDate] || [];
    const updatedRows = currentRows.filter((row) => row.key !== key);
    setRowsByDate({
      ...rowsByDate,
      [currentUser]: {
        ...userRows,
        [currentDate]: updatedRows,
      },
    });
  };

  const handleUserChange = (e) => {
    setUser(e.target.value);
  };

  const handleUserSubmit = () => {
    setCurrentUser(user);
  };

  const renderItem = ({ item }) => (
    <div style={styles.row}>
      <input
        style={styles.cell}
        value={item.exercise}
        placeholder="Exercise"
        onChange={(e) =>
          handleInputChange(item.key, "exercise", e.target.value)
        }
      />
      <input
        style={styles.cell}
        value={item.sets}
        placeholder="Sets"
        type="number"
        onChange={(e) => handleInputChange(item.key, "sets", e.target.value)}
      />
      <input
        style={styles.cell}
        value={item.reps}
        placeholder="Reps"
        type="number"
        onChange={(e) => handleInputChange(item.key, "reps", e.target.value)}
      />
      <input
        style={styles.cell}
        value={item.weight}
        placeholder="Weight"
        type="number"
        onChange={(e) => handleInputChange(item.key, "weight", e.target.value)}
      />
      <button
        style={styles.deleteButton}
        onClick={() => handleDeleteRow(item.key)}
      >
        Delete
      </button>
    </div>
  );

  const renderLastThreeRecords = (exercise) => {
    const userRows = rowsByDate[currentUser] || {};
    const allDates = Object.keys(userRows).sort(
      (a, b) => new Date(b).getTime() - new Date(a).getTime()
    );

    const records = [];

    for (const date of allDates) {
      const rows = userRows[date];
      for (const row of rows) {
        if (row.exercise === exercise) {
          records.push(row);
        }
      }
    }

    if (records.length === 0) {
      return null;
    }

    const lastThreeRecords = records.slice(-3).reverse();

    return (
      <div style={styles.historyContainer}>
        <div style={styles.historyTitle}>Last 3 Records for {exercise}:</div>
        {lastThreeRecords.map((record, index) => (
          <div key={index} style={styles.historyRow}>
            <div style={styles.historyCell}>Sets: {record.sets}</div>
            <div style={styles.historyCell}>Reps: {record.reps}</div>
            <div style={styles.historyCell}>Weight: {record.weight}</div>
          </div>
        ))}
      </div>
    );
  };

  const currentDate = formatDate(date);
  const userRows = rowsByDate[currentUser] || {};
  const currentRows = userRows[currentDate] || [];

  return (
    <div style={styles.container}>
      <style>{mediaStyles}</style>
      <div style={styles.userContainer}>
        <input
          type="text"
          placeholder="Enter User"
          value={user}
          onChange={handleUserChange}
          style={styles.userInput}
        />
        <button onClick={handleUserSubmit} style={styles.userButton}>
          Submit
        </button>
      </div>
      {currentUser && (
        <>
          <div style={styles.dateContainer}>
            <button onClick={handlePreviousDate}>{"<"}</button>
            <div style={styles.date}>{currentDate}</div>
            <button onClick={handleNextDate}>{">"}</button>
          </div>

          <button style={{ width: "100%" }} onClick={addRow}>
            Add Row
          </button>

          <div style={styles.table}>
            <div style={styles.tableHeadersWrapper}>
              <div style={{ ...styles.headerCell, ...styles.cell }}>
                Exercise
              </div>
              <div style={{ ...styles.headerCell, ...styles.cell }}>Sets</div>
              <div style={{ ...styles.headerCell, ...styles.cell }}>Reps</div>
              <div style={{ ...styles.headerCell, ...styles.cell }}>Weight</div>
              <div style={{ ...styles.headerCell, ...styles.cell }}></div>
            </div>

            {currentRows.map((item) => (
              <div key={item.key}>{renderItem({ item })}</div>
            ))}
          </div>

          {currentRows.map((row) => (
            <div key={row.key}>
              {row.exercise ? renderLastThreeRecords(row.exercise) : null}
            </div>
          ))}
        </>
      )}
    </div>
  );
}
const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    padding: 16,
    width: "100vw",
    height: "100vh",
    overflow: "auto",
    boxSizing: "border-box",
  },
  userContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  userInput: {
    flex: 1,
    padding: 8,
    marginRight: 8,
    border: "1px solid #ccc",
    borderRadius: 4,
  },
  userButton: {
    padding: 8,
    border: "none",
    borderRadius: 4,
    backgroundColor: "#007bff",
    color: "#fff",
    cursor: "pointer",
  },
  dateContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  date: {
    fontSize: 20,
  },
  table: {
    marginTop: 16,
    width: "100%",
  },
  tableHeadersWrapper: {
    display: "flex",
    flexDirection: "row",
    marginBottom: 8,
  },
  headerCell: {
    fontWeight: "bold",
    textAlign: "center",
    flex: 1,
    padding: 8,
  },
  row: {
    display: "flex",
    flexDirection: "row",
    marginBottom: 8,
  },
  cell: {
    flex: 1,
    padding: 8,
    width: "60px",
    border: "1px solid #ccc",
    boxSizing: "border-box",
  },
  historyContainer: {
    marginTop: 16,
  },
  historyTitle: {
    fontWeight: "bold",
    marginBottom: 8,
  },
  historyRow: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 4,
  },
  historyCell: {
    flex: 1,
    textAlign: "center",
  },
};

const mediaStyles = `
@media (max-width: 600px) {
  .dateContainer {
    flex-direction: column;
    align-items: flex-start;
  }
  .date {
    font-size: 18px;
    margin-bottom: 8px;
  }
  .headerCell, .row {
    flex-direction: column;
    align-items: flex-start;
  }
  .cell {
    width: 100%;
    margin-bottom: 8px;
    padding: 8px;
  }
}
`;
