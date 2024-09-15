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
import { Select } from "./components/ui/select";
import { SelectTrigger } from "./components/ui/select";
import { SelectValue } from "./components/ui/select";
import { SelectContent } from "./components/ui/select";
import { SelectItem } from "./components/ui/select";
import P90xWorkouts from "./workouts/P90xWorkouts";

export default function App() {
  const [date, setDate] = useState(new Date());
  const [rowsByDate, setRowsByDate] = useState({});
  const [selectedWorkout, setSelectedWorkout] = useState(false);
  const [savedWorkouts, setSavedWorkouts] = useState({});
  const [workoutName, setWorkoutName] = useState("");
  const [currentPage, setCurrentPage] = useState("workout");
  const currentUser = "defaultUser";
  const predefinedWorkouts = [...P90xWorkouts];

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
      currentDate: date.toISOString(),
    };
    localStorage.setItem("workoutAppData", JSON.stringify(data));
  }, [rowsByDate, savedWorkouts, date]);

  const handleWorkoutSelect = (workoutName) => {
    setSelectedWorkout(workoutName);
    const workout = predefinedWorkouts.find((w) => w.name === workoutName);
    if (workout) {
      const currentDate = date;
      setRowsByDate({
        ...rowsByDate,
        [currentUser]: {
          ...rowsByDate[currentUser],
          [currentDate]: workout.exercises.map((exercise, index) => ({
            ...exercise,
            key: `${index + 1}`,
          })),
        },
      });
    }
  };

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
      sets: "1",
      setsData: [{ reps: "", weight: "" }],
    };
    setRowsByDate({
      ...rowsByDate,
      [currentUser]: {
        ...userRows,
        [currentDate]: [...currentRows, newExercise],
      },
    });
  };

  const handleInputChange = (key, field, value, setIndex) => {
    const currentDate = date;
    setRowsByDate((prevRowsByDate) => {
      const userRows = prevRowsByDate[currentUser] || {};
      const currentRows = userRows[currentDate] || [];
      const newRows = currentRows.map((row) => {
        if (row.key === key) {
          if (field === "sets") {
            const newSetsCount = parseInt(value) || 0;
            const currentSetsData = row.setsData || [];
            const newSetsData = Array(newSetsCount)
              .fill()
              .map(
                (_, index) => currentSetsData[index] || { reps: "", weight: "" }
              );
            return { ...row, [field]: value, setsData: newSetsData };
          } else if (field === "reps" || field === "weight") {
            const newSetsData = [...(row.setsData || [])];
            newSetsData[setIndex] = {
              ...newSetsData[setIndex],
              [field]: value,
            };
            return { ...row, setsData: newSetsData };
          }
          return { ...row, [field]: value };
        }
        return row;
      });
      return {
        ...prevRowsByDate,
        [currentUser]: {
          ...userRows,
          [currentDate]: newRows,
        },
      };
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

  const exportWorkoutInformation = () => {
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

  const importWorkoutInformation = (file) => {
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

          <div className="w-full px-2 mb-4">
            <Select onValueChange={handleWorkoutSelect} value={selectedWorkout}>
              <SelectTrigger>
                <SelectValue placeholder="Select a workout" />
              </SelectTrigger>
              <SelectContent>
                {predefinedWorkouts.map((workout) => (
                  <SelectItem key={workout.name} value={workout.name}>
                    {workout.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
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
          exportWorkoutInformation={exportWorkoutInformation}
          importWorkoutInformation={importWorkoutInformation}
        />
      )}
      <NavBar setCurrentPage={setCurrentPage} />
    </div>
  );
}
