import { useState, useEffect, useMemo, Fragment } from "react";
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
import useAppStore from "@store";

const WorkoutTable = ({ handleInputChange, currentUser }) => {
  const removeExerciseFromDate = useAppStore(
    (state) => state.removeExerciseFromDate
  );
  const currentDate = useAppStore((state) => state.currentDate);
  const exercisesByDate = useAppStore((state) => state.exercisesByDate);
  const userRows = useMemo(
    () => exercisesByDate[currentUser] || {},
    [exercisesByDate, currentUser]
  );
  const currentRows = useMemo(
    () => userRows[currentDate] || [],
    [userRows, currentDate]
  );

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
  }, [currentRows, exercisesByDate, currentUser]);

  const getLastVolume = (exercise) => {
    const historicalData = exercisesByDate[currentUser] || {};
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
          {currentRows.map((item, index) => {
            const showRepsWeight = shouldShowRepsWeight(item);

            return (
              <Fragment key={item.key || index}>
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
                      value={item.exercise}
                      onChange={(e) =>
                        handleInputChange(item.key, "exercise", e.target.value)
                      }
                      placeholder="Enter exercise name"
                    />
                  </TableCell>
                  <TableCell className="w-16">
                    <Input
                      type="number"
                      value={item.sets}
                      onChange={(e) =>
                        handleInputChange(item.key, "sets", e.target.value)
                      }
                      placeholder="Sets"
                      inputMode="numeric"
                    />
                  </TableCell>
                  <TableCell className="w-16">
                    {showRepsWeight ? (
                      <Input
                        type="number"
                        value={item.setsData?.[0]?.reps || ""}
                        onChange={(e) =>
                          handleUnexpandedSetUpdate(
                            item.key,
                            "reps",
                            e.target.value
                          )
                        }
                        placeholder="Reps"
                        inputMode="numeric"
                      />
                    ) : (
                      "-"
                    )}
                  </TableCell>
                  <TableCell className="w-16">
                    {showRepsWeight ? (
                      <Input
                        type="number"
                        value={item.setsData?.[0]?.weight || ""}
                        onChange={(e) =>
                          handleUnexpandedSetUpdate(
                            item.key,
                            "weight",
                            e.target.value
                          )
                        }
                        placeholder="Weight"
                        inputMode="decimal"
                      />
                    ) : (
                      "-"
                    )}
                  </TableCell>
                  <TableCell>
                    <Button
                      onClick={() => removeExerciseFromDate(item.key)}
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
                        exercisesByDate={exercisesByDate}
                        currentUser={currentUser}
                        isVisible={true}
                        currentExercise={item}
                        onSetUpdate={handleSetUpdate}
                      />
                    </TableCell>
                  </TableRow>
                )}
              </Fragment>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};

export default WorkoutTable;
