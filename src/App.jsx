import React, { useState, useEffect, useMemo } from "react";
import WorkoutTable from "./components/WorkoutTable";
import NavBar from "./components/NavBar";
import CalendarPage from "./components/CalendarPage";
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
import { timeToZero } from "./lib/utils";
import StreakDisplay from "./components/StreakDisplay";
import useAppStore from "@store";

export default function App() {
  const currentDate = useAppStore((state) => state.currentDate);
  const setCurrentDate = useAppStore((state) => state.setCurrentDate);
  const currentUser = useAppStore((state) => state.currentUser);
  const exercisesByDate = useAppStore((state) => state.exercisesByDate);
  const setExercisesByDate = useAppStore((state) => state.setExercisesByDate);
  const savedWorkouts = useAppStore((state) => state.savedWorkouts);
  const setSavedWorkouts = useAppStore((state) => state.setSavedWorkouts);
  const currentPage = useAppStore((state) => state.currentPage);
  const [selectedWorkout, setSelectedWorkout] = useState("");
  const workoutNames = useAppStore((state) => state.workoutNames);
  const setWorkoutNames = useAppStore((state) => state.setWorkoutNames);

  useEffect(() => {
    // update streak
    const userRows = exercisesByDate[currentUser] || {};
    // check all previous dates for a consecutive workout
    let streak = 0;
    let previousDate = timeToZero(new Date(currentDate));
    while (true) {
      previousDate.setDate(previousDate.getDate() - 1);
      const previousRows = userRows[previousDate?.toISOString()] || [];
      if (previousRows.length === 0) {
        break;
      }
      streak++;
    }
    localStorage.setItem("workoutStreak", streak);
  }, [exercisesByDate]);

  const handleWorkoutSelect = (workoutName) => {
    setSelectedWorkout(workoutName);
    const workout = Object.values(savedWorkouts).find(
      (w) => w.name === workoutName
    );
    const currentDateStr = timeToZero(new Date(currentDate)).toISOString();

    // Save workout name
    const updatedNames = {
      ...workoutNames,
      [currentDateStr]: workoutName,
    };
    setWorkoutNames(updatedNames);

    if (workout) {
      setExercisesByDate({
        ...exercisesByDate,
        [currentUser]: {
          ...exercisesByDate[currentUser],
          [currentDateStr]: workout.exercises.map((exercise, index) => ({
            ...exercise,
            key: `${index + 1}`,
          })),
        },
      });
    }
  };

  const handlePreviousDate = () => {
    const previousDate = timeToZero(new Date(currentDate));
    previousDate.setDate(previousDate.getDate() - 1);
    setCurrentDate(previousDate.toISOString());
  };

  const handleNextDate = () => {
    const nextDate = timeToZero(new Date(currentDate));
    nextDate.setDate(nextDate.getDate() + 1);
    setCurrentDate(nextDate.toISOString());
  };

  const addExercise = () => {
    const userRows = exercisesByDate[currentUser] || {};
    const currentRows = userRows[currentDate] || [];
    const newExercise = {
      key: `${currentRows.length + 1}`,
      exercise: "",
      sets: "1",
      setsData: [{ reps: "", weight: "" }],
    };
    setExercisesByDate({
      ...exercisesByDate,
      [currentUser]: {
        ...userRows,
        [currentDate]: [...currentRows, newExercise],
      },
    });
  };

  const handleInputChange = (key, field, value, setIndex = 0) => {
    const prevExercisesByDate = { ...exercisesByDate };
    const userRows = prevExercisesByDate[currentUser] || {};
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
        } else if (field === "setsData") {
          // Handle the case where the entire setsData array is being updated
          return { ...row, setsData: value };
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

    setExercisesByDate({
      ...prevExercisesByDate,
      [currentUser]: {
        ...userRows,
        [currentDate]: newRows,
      },
    });
  };

  const exportWorkoutInformation = () => {
    const data = {
      exercisesByDate,
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

  const parseRowsByDate = (newRowsByDate) => {
    const parsedRowsByDate = {};
    parsedRowsByDate.defaultUser = {};

    for (const [key, value] of Object.entries(newRowsByDate.defaultUser)) {
      parsedRowsByDate.defaultUser[timeToZero(key)] = value;
    }

    return parsedRowsByDate;
  };

  const importWorkoutInformation = (file) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const importedData = JSON.parse(event.target.result);
        setExercisesByDate(parseRowsByDate(importedData.exercisesByDate));
        setSavedWorkouts(importedData.savedWorkouts);
      } catch (e) {
        alert("Invalid JSON file");
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="flex flex-col w-[100vw] h-[100vh]">
      {currentPage === "workout" && (
        <div className="w-full h-[calc(100%-60px)]">
          <div className="p-4">
            <StreakDisplay />
          </div>
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
                    !currentDate && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {currentDate ? (
                    format(currentDate, "PPP")
                  ) : (
                    <span>Pick a date</span>
                  )}
                </Button>
              </PopoverTrigger>
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
                {Object.values(savedWorkouts).map((workout, i) => (
                  <SelectItem key={i} value={workout.name}>
                    {workout.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="w-full flex flex-col items-end h-[72%]">
            <div className="w-full max-h-[80%] overflow-y-auto">
              <WorkoutTable
                handleInputChange={handleInputChange}
                currentUser={currentUser}
              />
            </div>
            <Button onClick={addExercise} size="icon" className="mr-5 mt-5">
              <Plus />
            </Button>
          </div>
        </div>
      )}
      {currentPage === "calendar" && (
        <CalendarPage
          exercisesByDate={exercisesByDate}
          currentUser={currentUser}
          workoutNames={workoutNames}
        />
      )}

      {currentPage === "settings" && (
        <SettingsPage
          exportWorkoutInformation={exportWorkoutInformation}
          importWorkoutInformation={importWorkoutInformation}
        />
      )}
      <NavBar />
    </div>
  );
}
