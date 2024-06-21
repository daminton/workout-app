import React, { useState, useEffect } from "react";
import DatePickerComponent from "./components/DatePickerComponent";
import WorkoutOptions from "./components/WorkoutOptions";
import WorkoutTable from "./components/WorkoutTable";
import WorkoutHistory from "./components/WorkoutHistory";
import NavBar from "./components/NavBar";
import TimerPage from "./components/TimerPage";
import { formatDate } from "./utils/dateUtils";
import { styles, mediaStyles } from "./styles/styles";

export default function App() {
  const [date, setDate] = useState(new Date());
  const [rowsByDate, setRowsByDate] = useState({});
  const [currentUser, setCurrentUser] = useState("defaultUser");
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [savedWorkouts, setSavedWorkouts] = useState({});
  const [workoutName, setWorkoutName] = useState("");
  const [showOptions, setShowOptions] = useState(false);
  const [currentPage, setCurrentPage] = useState("workout");

  useEffect(() => {
    const storedRows = localStorage.getItem("exerciseRows");
    if (storedRows) {
      setRowsByDate(JSON.parse(storedRows));
    }

    const storedWorkouts = localStorage.getItem("savedWorkouts");
    if (storedWorkouts) {
      setSavedWorkouts(JSON.parse(storedWorkouts));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("exerciseRows", JSON.stringify(rowsByDate));
  }, [rowsByDate]);

  useEffect(() => {
    localStorage.setItem("savedWorkouts", JSON.stringify(savedWorkouts));
  }, [savedWorkouts]);

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

  const currentDate = formatDate(date);
  const userRows = rowsByDate[currentUser] || {};
  const currentRows = userRows[currentDate] || [];

  return (
    <div style={styles.container}>
      <style>{mediaStyles}</style>
      {currentPage === "workout" && (
        <>
          <div style={styles.dateContainer}>
            <button onClick={handlePreviousDate}>{"<"}</button>
            <div
              style={styles.date}
              onClick={() => setIsCalendarOpen(!isCalendarOpen)}
            >
              {currentDate}
            </div>
            <button onClick={handleNextDate}>{">"}</button>
          </div>
          {isCalendarOpen && (
            <DatePickerComponent date={date} setDate={setDate} />
          )}

          <div style={styles.optionsButtonContainer}>
            <button
              onClick={() => setShowOptions(!showOptions)}
              style={{ width: "100%" }}
            >
              Options
            </button>
            {showOptions && (
              <WorkoutOptions
                workoutName={workoutName}
                setWorkoutName={setWorkoutName}
                saveWorkout={() =>
                  saveWorkout(
                    date,
                    rowsByDate,
                    currentUser,
                    workoutName,
                    savedWorkouts,
                    setSavedWorkouts
                  )
                }
                loadWorkout={(name) =>
                  loadWorkout(
                    name,
                    date,
                    setRowsByDate,
                    currentUser,
                    savedWorkouts
                  )
                }
                deleteWorkout={(name) =>
                  deleteWorkout(name, savedWorkouts, setSavedWorkouts)
                }
                updateWorkout={(name) =>
                  updateWorkout(
                    name,
                    date,
                    rowsByDate,
                    currentUser,
                    savedWorkouts,
                    setSavedWorkouts
                  )
                }
                savedWorkouts={savedWorkouts}
              />
            )}
          </div>

          <button style={{ width: "100%" }} onClick={addRow}>
            Add Row
          </button>

          <WorkoutTable
            currentRows={currentRows}
            handleInputChange={handleInputChange}
            handleDeleteRow={handleDeleteRow}
          />

          {currentRows.map((row) => (
            <div key={row.key}>
              {row.exercise ? (
                <WorkoutHistory
                  exercise={row.exercise}
                  rowsByDate={rowsByDate}
                  currentUser={currentUser}
                />
              ) : null}
            </div>
          ))}
        </>
      )}
      {currentPage === "timer" && <TimerPage />}
      <NavBar setCurrentPage={setCurrentPage} />
    </div>
  );
}
