import React, { useState, useEffect } from "react";
import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from "./ui/table";
import { Input } from "./ui/input";
import WorkoutHistory from "./WorkoutHistory";
import { Button } from "./ui/button";
import { Trash2 } from "lucide-react";

const WorkoutTable = ({
  currentRows,
  handleInputChange,
  handleDeleteRow,
  rowsByDate,
  currentUser,
}) => {
  const [volumeChanges, setVolumeChanges] = useState({});
  const [visibleHistory, setVisibleHistory] = useState({});

  useEffect(() => {
    const changes = {};
    currentRows.forEach((item) => {
      const lastVolume = getLastVolume(item.exercise);
      const sets = parseInt(item.sets);
      const reps = parseInt(item.reps);
      const weight = parseFloat(item.weight);
      const currentVolume = calculateCurrentVolume(sets, reps, weight);

      changes[item.key] =
        lastVolume === null || currentVolume > lastVolume ? "green" : "red";
    });
    setVolumeChanges(changes);
  }, [currentRows, rowsByDate, currentUser]);

  const toggleHistory = (key) => {
    setVisibleHistory((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const getLastVolume = (exercise) => {
    const historicalData = rowsByDate[currentUser] || {};
    let lastVolume = null;

    // Find the last recorded volume for the exercise, assuming dates are in chronological order
    const sortedDates = Object.keys(historicalData).sort(
      (a, b) => new Date(a) - new Date(b)
    );
    for (let i = sortedDates.length - 1; i >= 0; i--) {
      const date = sortedDates[i];
      const rows = historicalData[date];
      for (const row of rows) {
        if (row.exercise === exercise) {
          const sets = parseInt(row.sets);
          const reps = parseInt(row.reps);
          const weight = parseFloat(row.weight);
          let volume = 0;
          if (weight === 0) {
            volume = sets * reps;
          } else {
            volume = sets * reps * weight;
          }
          if (lastVolume !== null) {
            return volume; // Return the last volume found
          }
          lastVolume = volume;
        }
      }
    }

    return lastVolume;
  };

  const calculateCurrentVolume = (sets, reps, weight) => {
    let currentVolume = 0;
    if (!isNaN(sets) && !isNaN(reps) && !isNaN(weight)) {
      if (weight === 0) {
        currentVolume = sets * reps;
      } else {
        currentVolume = sets * reps * weight;
      }
    }
    return currentVolume;
  };

  return (
    <div className="w-full flex justify-center">
      <Table className="w-[98%]">
        <TableHeader>
          <TableRow>
            <TableHead>Exercise</TableHead>
            <TableHead>Sets</TableHead>
            <TableHead>Reps</TableHead>
            <TableHead>Weight</TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {currentRows.map((item) => {
            const backgroundColor = volumeChanges[item.key] || "white";

            return (
              <React.Fragment key={item.key}>
                <TableRow onClick={() => toggleHistory(item.key)}>
                  <TableCell>
                    <Input
                      style={{
                        backgroundColor: backgroundColor,
                      }}
                      value={item.exercise}
                      onChange={(e) =>
                        handleInputChange(item.key, "exercise", e.target.value)
                      }
                      placeholder="Enter exercise name"
                    />
                  </TableCell>
                  <TableCell className="w-16">
                    <Input
                      value={item.sets}
                      onChange={(e) =>
                        handleInputChange(item.key, "sets", e.target.value)
                      }
                      placeholder="Sets"
                    />
                  </TableCell>
                  <TableCell className="w-16">
                    <Input
                      value={item.reps}
                      onChange={(e) =>
                        handleInputChange(item.key, "reps", e.target.value)
                      }
                      placeholder="Reps"
                    />
                  </TableCell>
                  <TableCell className="w-16">
                    <Input
                      value={item.weight}
                      onChange={(e) =>
                        handleInputChange(item.key, "weight", e.target.value)
                      }
                      placeholder="Weight"
                    />
                  </TableCell>
                  <TableCell>
                    <Button
                      onClick={() => handleDeleteRow(item.key)}
                      variant={"destructive"}
                      size={"icon"}
                    >
                      <Trash2 size={22} color="black" />
                    </Button>
                  </TableCell>
                </TableRow>
                {item.exercise && (
                  <TableRow>
                    <TableCell colSpan={5}>
                      <WorkoutHistory
                        exercise={item.exercise}
                        rowsByDate={rowsByDate}
                        currentUser={currentUser}
                        isVisible={visibleHistory[item.key]}
                      />
                    </TableCell>
                  </TableRow>
                )}
              </React.Fragment>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};

export default WorkoutTable;
