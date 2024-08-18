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
import { Trash2, View } from "lucide-react";

const WorkoutTable = ({
  currentRows,
  handleInputChange,
  handleDeleteRow,
  rowsByDate,
  currentUser,
}) => {
  const [volumeChanges, setVolumeChanges] = useState({});
  const [visibleHistory, setVisibleHistory] = useState({});
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
        lastVolume === null || currentVolume > lastVolume ? "green" : "red";
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

  return (
    <div className="w-full flex justify-center">
      <Table className="w-[96%]">
        <TableHeader>
          <TableRow>
            <TableHead></TableHead>
            <TableHead>Exercise</TableHead>
            <TableHead>Sets</TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {currentRows.map((item) => {
            const backgroundColor = volumeChanges[item.key] || "white";

            return (
              <React.Fragment key={item.key}>
                <TableRow>
                  <TableCell>
                    <Button
                      onClick={() => toggleExpand(item.key)}
                      size={"icon"}
                    >
                      <View size={22} color="black" />
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
                    <TableCell colSpan={3}>
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
