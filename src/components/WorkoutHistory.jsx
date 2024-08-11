import React from "react";
import { format } from "date-fns";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";

const WorkoutHistory = ({ exercise, rowsByDate, currentUser, isVisible }) => {
  if (!isVisible) return null;
  const history = [];
  for (const date in rowsByDate[currentUser]) {
    const rows = rowsByDate[currentUser][date];
    rows.forEach((row) => {
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

        history.push({
          date,
          sets: row.sets,
          reps: row.reps,
          weight: row.weight,
          volume: volume,
        });
      }
    });
  }

  // Display only the last three instances
  const lastThreeEntries = history.slice(-3).reverse();

  return (
    <div className=" p-2 rounded-md mt-2">
      <h4 className="text-sm font-medium mb-2">
        Last 3 Records for {exercise}
      </h4>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Date</TableHead>
            <TableHead>Sets</TableHead>
            <TableHead>Reps</TableHead>
            <TableHead>Weight</TableHead>
            <TableHead>Volume</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {lastThreeEntries.map((entry, index) => (
            <TableRow key={index}>
              <TableCell>
                {format(new Date(entry.date), "MMM d, yyyy")}
              </TableCell>
              <TableCell>{entry.sets}</TableCell>
              <TableCell>{entry.reps}</TableCell>
              <TableCell>{entry.weight}</TableCell>
              <TableCell>{entry.volume.toFixed(1)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default WorkoutHistory;
