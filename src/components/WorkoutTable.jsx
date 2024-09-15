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
import WorkoutInformation from "./WorkoutInformation";
import { Button } from "./ui/button";
import { Trash2, ChevronDown, ChevronUp } from "lucide-react";

const WorkoutTable = ({
  currentRows,
  handleInputChange,
  handleDeleteRow,
  rowsByDate,
  currentUser,
}) => {
  const [volumeChanges, setVolumeChanges] = useState({});
  const [expandedRows, setExpandedRows] = useState({});

  const handleSetUpdate = (exerciseKey, setIndex, field, value) => {
    handleInputChange(exerciseKey, field, value, setIndex);
  };

  useEffect(() => {
    const changes = {};
    currentRows.forEach((item) => {
      const lastVolume = getLastVolume(item.exercise);
      const currentVolume = calculateCurrentVolume(item);

      changes[item.key] =
        lastVolume === null || currentVolume > lastVolume
          ? "#5fa052"
          : "	#984b4b";
    });
    setVolumeChanges(changes);
  }, [currentRows, rowsByDate, currentUser]);

  const getLastVolume = (exercise) => {
    const historicalData = rowsByDate[currentUser] || {};
    let lastVolume = null;

    const sortedDates = Object.keys(historicalData).sort(
      (a, b) => new Date(a) - new Date(b)
    );
    for (let i = sortedDates.length - 1; i >= 0; i--) {
      const date = sortedDates[i];
      const rows = historicalData[date];
      for (const row of rows) {
        if (row.exercise === exercise) {
          let volume = 0;
          (row.setsData || []).forEach((set) => {
            const reps = parseInt(set.reps) || 0;
            const weight = parseFloat(set.weight) || 0;
            volume += reps * (weight > 0 ? weight : 1);
          });
          if (lastVolume !== null) {
            return volume; // Return the last volume found
          }
          lastVolume = volume;
        }
      }
    }

    return lastVolume;
  };

  const calculateCurrentVolume = (item) => {
    let currentVolume = 0;
    (item.setsData || []).forEach((set) => {
      const reps = parseInt(set.reps) || 0;
      const weight = parseFloat(set.weight) || 0;
      currentVolume += reps * (weight > 0 ? weight : 1);
    });
    return currentVolume;
  };

  const toggleExpand = (key) => {
    setExpandedRows((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const shouldShowRepsWeight = (item) => {
    return !expandedRows[item.key] || allSetsEqual(item.setsData);
  };

  const allSetsEqual = (setsData) => {
    if (!setsData || setsData.length === 0) return true;
    const firstSet = setsData[0];
    return setsData.every(
      (set) => set.reps === firstSet.reps && set.weight === firstSet.weight
    );
  };

  const handleUnexpandedSetUpdate = (exerciseKey, field, value) => {
    const exercise = currentRows.find((row) => row.key === exerciseKey);
    if (exercise) {
      const newSetsData = (exercise.setsData || []).map((set) => ({
        ...set,
        [field]: value,
      }));
      handleInputChange(exerciseKey, "setsData", newSetsData);
    }
  };

  return (
    <div className="w-full flex justify-center">
      <Table className="w-[96%]">
        <TableHeader>
          <TableRow>
            <TableHead></TableHead>
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
            const showRepsWeight = shouldShowRepsWeight(item);

            return (
              <React.Fragment key={item.key}>
                <TableRow>
                  <TableCell>
                    <Button
                      onClick={() => toggleExpand(item.key)}
                      size={"icon"}
                    >
                      {expandedRows[item.key] ? (
                        <ChevronUp size={22} color="black" />
                      ) : (
                        <ChevronDown size={22} color="black" />
                      )}
                    </Button>
                  </TableCell>
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
                    {showRepsWeight ? (
                      <Input
                        value={item.setsData?.[0]?.reps || ""}
                        onChange={(e) =>
                          handleUnexpandedSetUpdate(
                            item.key,
                            "reps",
                            e.target.value
                          )
                        }
                        placeholder="Reps"
                      />
                    ) : (
                      "-"
                    )}
                  </TableCell>
                  <TableCell className="w-16">
                    {showRepsWeight ? (
                      <Input
                        value={item.setsData?.[0]?.weight || ""}
                        onChange={(e) =>
                          handleUnexpandedSetUpdate(
                            item.key,
                            "weight",
                            e.target.value
                          )
                        }
                        placeholder="Weight"
                      />
                    ) : (
                      "-"
                    )}
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
                {expandedRows[item.key] && (
                  <TableRow>
                    <TableCell colSpan={6}>
                      <WorkoutInformation
                        exercise={item.exercise}
                        rowsByDate={rowsByDate}
                        currentUser={currentUser}
                        isVisible={true}
                        currentExercise={item}
                        onSetUpdate={handleSetUpdate}
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
