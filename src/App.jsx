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

export default function App() {
  const [date, setDate] = useState(new Date());
  const [rowsByDate, setRowsByDate] = useState({});
  const [currentUser, setCurrentUser] = useState("defaultUser");
  const [selectedWorkout, setSelectedWorkout] = useState(false);
  const [savedWorkouts, setSavedWorkouts] = useState({});
  const [workoutName, setWorkoutName] = useState("");
  const [currentPage, setCurrentPage] = useState("workout");

  const predefinedWorkouts = [
    {
      name: "P90X Back & Biceps",
      exercises: [
        {
          exercise: "Wide Front Pull-Ups",
          sets: "1",
          setsData: [{ reps: "", weight: "" }],
        },
        {
          exercise: "Lawnmowers",
          sets: "1",
          setsData: [{ reps: "", weight: "" }],
        },
        {
          exercise: "Twenty-Ones",
          sets: "1",
          setsData: [{ reps: "", weight: "" }],
        },
        {
          exercise: "One-Arm Cross-Body Curls",
          sets: "1",
          setsData: [{ reps: "", weight: "" }],
        },
        {
          exercise: "Switch Grip Pull-Ups",
          sets: "1",
          setsData: [{ reps: "", weight: "" }],
        },
        {
          exercise: "Elbows-Out Lawnmowers",
          sets: "1",
          setsData: [{ reps: "", weight: "" }],
        },
        {
          exercise: "Standing Bicep Curls",
          sets: "1",
          setsData: [{ reps: "", weight: "" }],
        },
        {
          exercise: "One-Arm Concentration Curls",
          sets: "1",
          setsData: [{ reps: "", weight: "" }],
        },
        {
          exercise: "Corn Cob Pull-Ups",
          sets: "1",
          setsData: [{ reps: "", weight: "" }],
        },
        {
          exercise: "Reverse Grip Bent-Over Rows",
          sets: "1",
          setsData: [{ reps: "", weight: "" }],
        },
        {
          exercise: "Open-Arm Curls",
          sets: "1",
          setsData: [{ reps: "", weight: "" }],
        },
        {
          exercise: "Static-Arm Curls",
          sets: "1",
          setsData: [{ reps: "", weight: "" }],
        },
        {
          exercise: "Congdon Locomotives",
          sets: "1",
          setsData: [{ reps: "", weight: "" }],
        },
        {
          exercise: "Crouching Cohen Curls",
          sets: "1",
          setsData: [{ reps: "", weight: "" }],
        },
        {
          exercise: "One-Arm Corkscrew Curls",
          sets: "1",
          setsData: [{ reps: "", weight: "" }],
        },
        {
          exercise: "Chin-Ups",
          sets: "1",
          setsData: [{ reps: "", weight: "" }],
        },
        {
          exercise: "Seated Bent-Over Back Flys",
          sets: "1",
          setsData: [{ reps: "", weight: "" }],
        },
        {
          exercise: "Curl-Up/Hammer Downs",
          sets: "1",
          setsData: [{ reps: "", weight: "" }],
        },
        {
          exercise: "Hammer Curls",
          sets: "1",
          setsData: [{ reps: "", weight: "" }],
        },
        {
          exercise: "Max Rep Pull-Ups",
          sets: "1",
          setsData: [{ reps: "", weight: "" }],
        },
        {
          exercise: "Superman",
          sets: "1",
          setsData: [{ reps: "", weight: "" }],
        },
        {
          exercise: "In-Out Hammer Curls",
          sets: "1",
          setsData: [{ reps: "", weight: "" }],
        },
        {
          exercise: "Strip-Set Curls",
          sets: "4",
          setsData: [
            { reps: "", weight: "" },
            { reps: "", weight: "" },
            { reps: "", weight: "" },
            { reps: "", weight: "" },
          ],
        },
      ],
    },
    {
      name: "P90X Chest, Shoulders, & Triceps",
      exercises: [
        {
          exercise: "Slow-Motion 3-in-1 Push-Ups",
          sets: "1",
          setsData: [{ reps: "", weight: "" }],
        },
        {
          exercise: "In & Out Shoulder Flys",
          sets: "1",
          setsData: [{ reps: "", weight: "" }],
        },
        {
          exercise: "Station Dips",
          sets: "1",
          setsData: [{ reps: "", weight: "" }],
        },
        {
          exercise: "Plange Push-Ups",
          sets: "1",
          setsData: [{ reps: "", weight: "" }],
        },
        {
          exercise: "Pike Presses",
          sets: "1",
          setsData: [{ reps: "", weight: "" }],
        },
        {
          exercise: "Side Tri-Rises",
          sets: "1",
          setsData: [{ reps: "", weight: "" }],
        },
        {
          exercise: "Floor Flys",
          sets: "1",
          setsData: [{ reps: "", weight: "" }],
        },
        {
          exercise: "Scarecrows",
          sets: "1",
          setsData: [{ reps: "", weight: "" }],
        },
        {
          exercise: "Overhead Triceps Extensions",
          sets: "1",
          setsData: [{ reps: "", weight: "" }],
        },
        {
          exercise: "Two-Twitch Speed Push-Ups",
          sets: "1",
          setsData: [{ reps: "", weight: "" }],
        },
        {
          exercise: "Y-Presses",
          sets: "1",
          setsData: [{ reps: "", weight: "" }],
        },
        {
          exercise: "Lying Triceps Extensions",
          sets: "1",
          setsData: [{ reps: "", weight: "" }],
        },
        {
          exercise: "Side-to-Side Push-Ups",
          sets: "1",
          setsData: [{ reps: "", weight: "" }],
        },
        {
          exercise: "Pour Flys",
          sets: "1",
          setsData: [{ reps: "", weight: "" }],
        },
        {
          exercise: "Side-Leaning Triceps Extensions",
          sets: "1",
          setsData: [{ reps: "", weight: "" }],
        },
        {
          exercise: "One-Arm Push-Ups",
          sets: "1",
          setsData: [{ reps: "", weight: "" }],
        },
        {
          exercise: "Weighted Circles",
          sets: "1",
          setsData: [{ reps: "", weight: "" }],
        },
        {
          exercise: "Throw the Bomb",
          sets: "1",
          setsData: [{ reps: "", weight: "" }],
        },
        {
          exercise: "Clap or Plyo Push-Ups",
          sets: "1",
          setsData: [{ reps: "", weight: "" }],
        },
        {
          exercise: "Slo-Mo Throws",
          sets: "1",
          setsData: [{ reps: "", weight: "" }],
        },
        {
          exercise: "Front-to-Back Triceps Extensions",
          sets: "1",
          setsData: [{ reps: "", weight: "" }],
        },
        {
          exercise: "One-Arm Balance Push-Ups",
          sets: "1",
          setsData: [{ reps: "", weight: "" }],
        },
        {
          exercise: "Fly-Row-Presses",
          sets: "1",
          setsData: [{ reps: "", weight: "" }],
        },
        {
          exercise: "Dumbbell Cross-Body Blows",
          sets: "1",
          setsData: [{ reps: "", weight: "" }],
        },
      ],
    },
    {
      name: "P90X Legs & Back",
      exercises: [
        {
          exercise: "Balanced Lunges",
          sets: "1",
          setsData: [{ reps: "", weight: "" }],
        },
        {
          exercise: "Calf-Raise Squats",
          sets: "1",
          setsData: [{ reps: "", weight: "" }],
        },
        {
          exercise: "Reverse Grip Chin-Ups",
          sets: "1",
          setsData: [{ reps: "", weight: "" }],
        },
        {
          exercise: "Super Skaters",
          sets: "1",
          setsData: [{ reps: "", weight: "" }],
        },
        {
          exercise: "Wall Squats",
          sets: "1",
          setsData: [{ reps: "", weight: "" }],
        },
        {
          exercise: "Wide Front Pull-Ups",
          sets: "1",
          setsData: [{ reps: "", weight: "" }],
        },
        {
          exercise: "Step Back Lunge",
          sets: "1",
          setsData: [{ reps: "", weight: "" }],
        },
        {
          exercise: "Alternating Side Lunge",
          sets: "1",
          setsData: [{ reps: "", weight: "" }],
        },
        {
          exercise: "Closed Grip Overhead Pull-Ups",
          sets: "1",
          setsData: [{ reps: "", weight: "" }],
        },
        {
          exercise: "Single-Leg Wall Squat",
          sets: "1",
          setsData: [{ reps: "", weight: "" }],
        },
        {
          exercise: "Deadlift Squats",
          sets: "1",
          setsData: [{ reps: "", weight: "" }],
        },
        {
          exercise: "Switch Grip Pull-Ups",
          sets: "1",
          setsData: [{ reps: "", weight: "" }],
        },
        {
          exercise: "Three-Way Lunge",
          sets: "1",
          setsData: [{ reps: "", weight: "" }],
        },
        {
          exercise: "Sneaky Lunge",
          sets: "1",
          setsData: [{ reps: "", weight: "" }],
        },
        {
          exercise: "Chair Salutations",
          sets: "1",
          setsData: [{ reps: "", weight: "" }],
        },
        {
          exercise: "Toe-Roll Iso Lunge",
          sets: "1",
          setsData: [{ reps: "", weight: "" }],
        },
        {
          exercise: "Groucho Walk",
          sets: "1",
          setsData: [{ reps: "", weight: "" }],
        },
        {
          exercise: "Calf Raises (Toes Out)",
          sets: "1",
          setsData: [{ reps: "", weight: "" }],
        },
        {
          exercise: "Calf Raises (Feet Parallel)",
          sets: "1",
          setsData: [{ reps: "", weight: "" }],
        },
        {
          exercise: "Calf Raises (Toes In)",
          sets: "1",
          setsData: [{ reps: "", weight: "" }],
        },
        {
          exercise: "Closed Grip Overhand Pull-Ups",
          sets: "1",
          setsData: [{ reps: "", weight: "" }],
        },
        {
          exercise: "80/20 Siebers-Speed Squats",
          sets: "1",
          setsData: [{ reps: "", weight: "" }],
        },
      ],
    },
    {
      name: "P90X Chest & Back",
      exercises: [
        {
          exercise: "Standard Push-Ups",
          sets: "1",
          setsData: [{ reps: "", weight: "" }],
        },
        {
          exercise: "Wide Front Pull-Ups",
          sets: "1",
          setsData: [{ reps: "", weight: "" }],
        },
        {
          exercise: "Military Push-Ups",
          sets: "1",
          setsData: [{ reps: "", weight: "" }],
        },
        {
          exercise: "Reverse Grip Chin-Ups",
          sets: "1",
          setsData: [{ reps: "", weight: "" }],
        },
        {
          exercise: "Wide Fly Push-Ups",
          sets: "1",
          setsData: [{ reps: "", weight: "" }],
        },
        {
          exercise: "Closed Grip Overhand Pull",
          sets: "1",
          setsData: [{ reps: "", weight: "" }],
        },
        {
          exercise: "Decline Push-Ups",
          sets: "1",
          setsData: [{ reps: "", weight: "" }],
        },
        {
          exercise: "Heavy Pants",
          sets: "1",
          setsData: [{ reps: "", weight: "" }],
        },
        {
          exercise: "Diamond Push-Ups",
          sets: "1",
          setsData: [{ reps: "", weight: "" }],
        },
        {
          exercise: "Lawnmowers",
          sets: "1",
          setsData: [{ reps: "", weight: "" }],
        },
        {
          exercise: "Dive-Bomber Push-Ups",
          sets: "1",
          setsData: [{ reps: "", weight: "" }],
        },
        {
          exercise: "Back Flys",
          sets: "1",
          setsData: [{ reps: "", weight: "" }],
        },
      ],
    },
    {
      name: "P90X Shoulders and Arms",
      exercises: [
        {
          exercise: "Alt. Shoulder Presses",
          sets: "1",
          setsData: [{ reps: "", weight: "" }],
        },
        {
          exercise: "In & Out Bicep Curls",
          sets: "1",
          setsData: [{ reps: "", weight: "" }],
        },
        {
          exercise: "Two-Arm Triceps Kickback",
          sets: "1",
          setsData: [{ reps: "", weight: "" }],
        },
        {
          exercise: "Alt. Shoulder Presses",
          sets: "1",
          setsData: [{ reps: "", weight: "" }],
        },
        {
          exercise: "In & Out Bicep Curls",
          sets: "1",
          setsData: [{ reps: "", weight: "" }],
        },
        {
          exercise: "Two-Arm Triceps Kickback",
          sets: "1",
          setsData: [{ reps: "", weight: "" }],
        },
        {
          exercise: "Deep Swimmer's Presses",
          sets: "1",
          setsData: [{ reps: "", weight: "" }],
        },
        {
          exercise: "Full Sup. Concentration Curls",
          sets: "1",
          setsData: [{ reps: "", weight: "" }],
        },
        {
          exercise: "Station Dips",
          sets: "1",
          setsData: [{ reps: "", weight: "" }],
        },
        {
          exercise: "Deep Swimmer's Presses",
          sets: "1",
          setsData: [{ reps: "", weight: "" }],
        },
        {
          exercise: "Full Sup. Concentration Curls",
          sets: "1",
          setsData: [{ reps: "", weight: "" }],
        },
        {
          exercise: "Station Dips",
          sets: "1",
          setsData: [{ reps: "", weight: "" }],
        },
        {
          exercise: "Upright Rows",
          sets: "1",
          setsData: [{ reps: "", weight: "" }],
        },
        {
          exercise: "Static Arm Curls",
          sets: "1",
          setsData: [{ reps: "", weight: "" }],
        },
        {
          exercise: "Flip-Grip Twist Tri Kickbacks",
          sets: "1",
          setsData: [{ reps: "", weight: "" }],
        },
        {
          exercise: "Upright Rows",
          sets: "1",
          setsData: [{ reps: "", weight: "" }],
        },
        {
          exercise: "Static Arm Curls",
          sets: "1",
          setsData: [{ reps: "", weight: "" }],
        },
        {
          exercise: "Flip-Grip Twist Tri Kickbacks",
          sets: "1",
          setsData: [{ reps: "", weight: "" }],
        },
        {
          exercise: "Seated Two-Angle Flys",
          sets: "1",
          setsData: [{ reps: "", weight: "" }],
        },
        {
          exercise: "Crouching Cohen Curls",
          sets: "1",
          setsData: [{ reps: "", weight: "" }],
        },
        {
          exercise: "Lying-Down Tri Extensions",
          sets: "1",
          setsData: [{ reps: "", weight: "" }],
        },
        {
          exercise: "Seated Two-Angle Flys",
          sets: "1",
          setsData: [{ reps: "", weight: "" }],
        },
        {
          exercise: "Crouching Cohen Curls",
          sets: "1",
          setsData: [{ reps: "", weight: "" }],
        },
        {
          exercise: "Lying-Down Tri Extensions",
          sets: "1",
          setsData: [{ reps: "", weight: "" }],
        },
        {
          exercise: "In & Out Straight Arm Flys",
          sets: "1",
          setsData: [{ reps: "", weight: "" }],
        },
        {
          exercise: "Congdon Curls",
          sets: "1",
          setsData: [{ reps: "", weight: "" }],
        },
        {
          exercise: "Side Tri-Rises",
          sets: "1",
          setsData: [{ reps: "", weight: "" }],
        },
        {
          exercise: "In & Out Straight Arm Flys",
          sets: "1",
          setsData: [{ reps: "", weight: "" }],
        },
        {
          exercise: "Congdon Curls",
          sets: "1",
          setsData: [{ reps: "", weight: "" }],
        },
        {
          exercise: "Side Tri-Rises",
          sets: "1",
          setsData: [{ reps: "", weight: "" }],
        },
      ],
    },
  ];

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
