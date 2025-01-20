import { useState } from "react";
import { Button } from "./ui/button";
import { Ellipsis, Play, Save } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Input } from "./ui/input";
import useAppStore from "@store";
import StreakDisplay from "./StreakDisplay";

export default function SavedWorkoutsList() {
  const saveWorkout = useAppStore((state) => state.saveWorkout);
  const savedWorkouts = useAppStore((state) => state.savedWorkouts);
  const loadWorkout = useAppStore((state) => state.loadWorkout);
  const [workoutName, setWorkoutName] = useState("");

  return (
    <div className="p-4 h-[73%] w-full">
      <StreakDisplay />
      <div className="overflow-auto h-full w-full flex flex-col p-5">
        <h2> Workout Options</h2>
        <div className="grow overflow-auto">
          <Table className="ml-2 mr-2">
            <TableHeader>
              <TableRow>
                <TableHead className="pl-0">Name</TableHead>
                <TableHead className="text-center">Exercises</TableHead>
                <TableHead className="text-right pr-0">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {Object.keys(savedWorkouts)
                .reverse()
                .map((name) => (
                  <SavedWorkout
                    key={name}
                    name={name}
                    workout={savedWorkouts[name]}
                    loadWorkout={loadWorkout}
                  />
                ))}
            </TableBody>
          </Table>
        </div>

        <div className="flex flex-row gap-2 mt-3">
          <Input
            type="text"
            placeholder="Untitled Workout"
            value={workoutName}
            onChange={(e) => setWorkoutName(e.target.value)}
          />
          <div>
            <Button
              variant="outline"
              size="icon"
              className="mr-2"
              onClick={() => {
                saveWorkout(workoutName);
              }}
            >
              <Save />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

function SavedWorkout({ name, workout, loadWorkout }) {
  return (
    <TableRow>
      <TableCell>{name}</TableCell>
      <TableCell className="text-center">{workout.exercises.length}</TableCell>
      <TableCell className="flex flex-row gap-2 justify-end">
        <WorkoutActions workoutName={name} loadWorkout={loadWorkout} />
        <Button
          variant="outline"
          size="icon"
          onClick={() => {
            loadWorkout(workout);
          }}
        >
          <Play />
        </Button>
      </TableCell>
    </TableRow>
  );
}

function WorkoutActions({ workoutName, loadWorkout }) {
  const saveWorkout = useAppStore((state) => state.saveWorkout);
  const deleteWorkout = useAppStore((state) => state.deleteWorkout);
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <Ellipsis />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => loadWorkout(workoutName)}>
          Load Workout
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() =>
            confirm("Overwrite workout?") && saveWorkout(workoutName)
          }
        >
          Update Workout
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() =>
            confirm("Are you sure you want to delete this workout?") &&
            deleteWorkout(workoutName)
          }
        >
          Delete Workout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
