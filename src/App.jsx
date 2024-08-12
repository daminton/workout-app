import React, { useState, useEffect } from "react";
import WorkoutTable from "./components/WorkoutTable";
import NavBar from "./components/NavBar";
import TimerPage from "./components/TimerPage";
import SettingsPage from "./components/SettingsPage";
import { Button } from "./components/ui/button";
import { Calendar } from "./components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "./components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { cn } from "./lib/utils";
import { format } from "date-fns";
import { Plus } from "lucide-react";
import { ChevronRightIcon, ChevronLeftIcon } from "lucide-react";

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
      setRowsByDate(parsedData.rowsByDate || {});
      setSavedWorkouts(parsedData.savedWorkouts || {});
      if (parsedData.currentDate) {
        setDate(new Date(parsedData.currentDate));
      }
    }
  }, []);

  useEffect(() => {
    const data = {
      rowsByDate,
      savedWorkouts,
      currentDate: date.toISOString(), // Save the current date
    };
    localStorage.setItem("workoutAppData", JSON.stringify(data));
  }, [rowsByDate, savedWorkouts, date]);

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
    const currentDate = date;
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
    const currentDate = date;
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
    const currentDate = date;
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
    const currentDate = date;
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
      const currentDate = date;
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

  const currentDate = date;
  const userRows = rowsByDate[currentUser] || {};
  const currentRows = userRows[currentDate] || [];

  return (
    <div className="flex flex-col w-[100vw] h-[100vh] overflow-auto ">
      {currentPage === "workout" && (
        <div className="w-full">
          <div className="flex flex-row items-center justify-between mb-4 cursor-pointer px-2 pt-2">
            <Button variant="outline" size="icon" onClick={handlePreviousDate}>
              <ChevronLeftIcon className="h-4 w-4" />
            </Button>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-fit border-0 justify-center text-lg",
                    !date && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? format(date, "PPP") : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
            <Button variant="outline" size="icon" onClick={handleNextDate}>
              <ChevronRightIcon className="h-4 w-4" />
            </Button>
          </div>

          <div className="w-full h-full flex flex-col items-end">
            <WorkoutTable
              currentRows={currentRows}
              handleInputChange={handleInputChange}
              handleDeleteRow={handleDeleteRow}
              rowsByDate={rowsByDate}
              currentUser={currentUser}
            />
            <Button onClick={addExercise} size="icon" className="mr-2 mt-5">
              <Plus />
            </Button>
          </div>
        </div>
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
