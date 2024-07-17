import React, { useState, useEffect } from "react";
import DatePickerComponent from "./components/DatePickerComponent";
import WorkoutTable from "./components/WorkoutTable";
import WorkoutHistory from "./components/WorkoutHistory";
import NavBar from "./components/NavBar";
import TimerPage from "./components/TimerPage";
import SettingsPage from "./components/SettingsPage";
import { formatDate } from "./utils/dateUtils";
import { styles, mediaStyles } from "./styles/styles";

export default function App() {
  const [date, setDate] = useState(new Date());
  const [rowsByDate, setRowsByDate] = useState({});
  const [currentUser, setCurrentUser] = useState("defaultUser");
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [savedWorkouts, setSavedWorkouts] = useState({});
  const [workoutName, setWorkoutName] = useState("");
  const [currentPage, setCurrentPage] = useState("workout");

  useEffect(() => {
    const storedData = localStorage.getItem("workoutAppData");
    if (storedData) {
      const parsedData = JSON.parse(storedData);
      setRowsByDate(parsedData.rowsByDate);
      setSavedWorkouts(parsedData.savedWorkouts);
    }
  }, []);

  useEffect(() => {
    const data = {
      rowsByDate,
      savedWorkouts,
    };
    localStorage.setItem("workoutAppData", JSON.stringify(data));
  }, [rowsByDate, savedWorkouts]);

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

  const addExercise = () => {
    const currentDate = formatDate(date);
    const userRows = rowsByDate[currentUser] || {};
    const currentRows = userRows[currentDate] || [];
    const newExercise = {
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
        [currentDate]: [...currentRows, newExercise],
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

  const saveWorkout = (name) => {
    const currentDate = formatDate(date);
    const userRows = rowsByDate[currentUser] || {};
    const currentRows = userRows[currentDate] || [];
    setSavedWorkouts({
      ...savedWorkouts,
      [name]: currentRows,
    });
  };

  const loadWorkout = (name) => {
    const workout = savedWorkouts[name];
    if (workout) {
      const currentDate = formatDate(date);
      setRowsByDate({
        ...rowsByDate,
        [currentUser]: {
          ...rowsByDate[currentUser],
          [currentDate]: workout,
        },
      });
    } else {
      alert("Workout not found");
    }
  };

  const deleteWorkout = (name) => {
    const newSavedWorkouts = { ...savedWorkouts };
    delete newSavedWorkouts[name];
    setSavedWorkouts(newSavedWorkouts);
  };

  const updateWorkout = (name) => {
    saveWorkout(name); // Updating is essentially saving over the existing workout
  };

  const exportWorkoutHistory = () => {
    const data = {
      rowsByDate,
      savedWorkouts,
    };
    const dataStr = JSON.stringify(data, null, 2);
    const blob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "workout_history.json";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const importWorkoutHistory = (file) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const importedData = JSON.parse(event.target.result);
        setRowsByDate(importedData.rowsByDate);
        setSavedWorkouts(importedData.savedWorkouts);
      } catch (e) {
        alert("Invalid JSON file");
      }
    };
    reader.readAsText(file);
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

          <button style={{ width: "100%" }} onClick={addExercise}>
            Add Exercise
          </button>

          <WorkoutTable
            currentRows={currentRows}
            handleInputChange={handleInputChange}
            handleDeleteRow={handleDeleteRow}
            rowsByDate={rowsByDate}
            currentUser={currentUser}
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
      {currentPage === "settings" && (
        <SettingsPage
          workoutName={workoutName}
          setWorkoutName={setWorkoutName}
          saveWorkout={saveWorkout}
          loadWorkout={loadWorkout}
          deleteWorkout={deleteWorkout}
          updateWorkout={updateWorkout}
          savedWorkouts={savedWorkouts}
          exportWorkoutHistory={exportWorkoutHistory}
          importWorkoutHistory={importWorkoutHistory}
        />
      )}
      <NavBar setCurrentPage={setCurrentPage} />
    </div>
  );
}
