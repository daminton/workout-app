import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

const WorkoutSelector = ({
  selectedWorkout,
  onWorkoutSelect,
  onClearWorkout,
  savedWorkouts,
}) => {
  return (
    <div className="w-full px-2 mb-4 flex gap-2 items-center">
      <Select
        value={selectedWorkout}
        onValueChange={onWorkoutSelect}
        className="flex-1"
      >
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

      {selectedWorkout && (
        <Button
          variant="ghost"
          size="icon"
          onClick={onClearWorkout}
          className="h-10 w-10 text-gray-500 hover:text-red-500"
        >
          <X className="h-4 w-4" />
        </Button>
      )}
    </div>
  );
};

export default WorkoutSelector;
