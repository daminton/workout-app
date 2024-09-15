import React, { useState, useEffect } from "react";
import { format } from "date-fns";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";

const WorkoutInformation = ({
  exercise,
  rowsByDate,
  currentUser,
  isVisible,
  currentExercise,
  onSetUpdate,
}) => {
  if (!isVisible) return null;
  const [notes, setNotes] = useState("");

  useEffect(() => {
    const savedNotes = localStorage.getItem(`${currentUser}_${exercise}_notes`);
    if (savedNotes) {
      setNotes(savedNotes);
    } else {
      setNotes("");
    }
  }, [currentUser, exercise]);

  const handleNotesChange = (e) => {
    const newNotes = e.target.value;
    setNotes(newNotes);
    localStorage.setItem(`${currentUser}_${exercise}_notes`, newNotes);
  };

  const history = [];
  for (const date in rowsByDate[currentUser]) {
    const rows = rowsByDate[currentUser][date];
    rows.forEach((row) => {
      if (row.exercise === exercise) {
        let volume = 0;
        const setsData = row.setsData || [];
        setsData.forEach((set) => {
          const reps = parseInt(set.reps) || 0;
          const weight = parseFloat(set.weight) || 0;
          volume += reps * (weight > 0 ? weight : 1);
        });

        history.push({
          date,
          volume,
          setsData,
        });
      }
    });
  }

  const lastThreeEntries = history.slice(-3).reverse();

  // Prepare data for the chart
  const chartData = lastThreeEntries.flatMap((entry, entryIndex) =>
    entry.setsData.map((set, setIndex) => ({
      date: format(new Date(entry.date), "MMM d"),
      setNumber: `Set ${setIndex + 1}`,
      reps: parseInt(set.reps) || 0,
      weight: parseFloat(set.weight) || 0,
      volume: (parseInt(set.reps) || 0) * (parseFloat(set.weight) || 1),
    }))
  );

  const setsData = currentExercise.setsData || [];

  const handleSetChange = (index, field, value) => {
    onSetUpdate(currentExercise.key, index, field, value);
  };

  return (
    <div className="p-2 rounded-md mt-2">
      <h4 className="text-sm font-medium mb-2">Reps and Sets for {exercise}</h4>

      <div className="overflow-x-auto">
        <Table className="mb-4">
          <TableHeader>
            <TableRow>
              <TableHead>Set</TableHead>
              <TableHead>Reps</TableHead>
              <TableHead>Weight</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {setsData.map((set, index) => (
              <TableRow key={index}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>
                  <Input
                    type="number"
                    value={set.reps}
                    onChange={(e) =>
                      handleSetChange(index, "reps", e.target.value)
                    }
                    className="w-16"
                  />
                </TableCell>
                <TableCell>
                  <Input
                    type="number"
                    value={set.weight}
                    onChange={(e) =>
                      handleSetChange(index, "weight", e.target.value)
                    }
                    className="w-16"
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <h4 className="text-sm font-medium mb-2 mt-4">Notes</h4>
      <Textarea
        value={notes}
        onChange={handleNotesChange}
        placeholder="Add your notes here..."
        className="mb-2"
      />
      <h4 className="text-sm font-medium mb-2">Last 3 Records</h4>
      <div className="overflow-x-auto">
        {lastThreeEntries.map((entry, entryIndex) => (
          <div key={entryIndex} className="mb-4">
            <h5 className="text-sm font-medium">
              {format(new Date(entry.date), "MMM d, yyyy")} - Total Volume:{" "}
              {entry.volume.toFixed(1)}
            </h5>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Set</TableHead>
                  <TableHead>Reps</TableHead>
                  <TableHead>Weight</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {entry.setsData.map((set, setIndex) => (
                  <TableRow key={setIndex}>
                    <TableCell>{setIndex + 1}</TableCell>
                    <TableCell>{set.reps}</TableCell>
                    <TableCell>{set.weight}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        ))}
      </div>

      <h4 className="text-sm font-medium mb-2">Last 3 Records Chart</h4>
      <div className="w-full h-[400px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis yAxisId="left" />
            <YAxis yAxisId="right" orientation="right" />
            <Tooltip />
            <Legend />
            <Line
              yAxisId="left"
              type="monotone"
              dataKey="reps"
              stroke="#8884d8"
              name="Reps"
            />
            <Line
              yAxisId="right"
              type="monotone"
              dataKey="weight"
              stroke="#82ca9d"
              name="Weight"
            />
            <Line
              yAxisId="left"
              type="monotone"
              dataKey="volume"
              stroke="#ffc658"
              name="Volume"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default WorkoutInformation;
