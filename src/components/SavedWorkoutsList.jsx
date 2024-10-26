import { useState } from 'react'
import { Button } from './ui/button';
import { Ellipsis, Play, Plus } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from './ui/dropdown-menu';
import { Input } from './ui/input';

export default function SavedWorkoutsList({
  workoutName,
  setWorkoutName,
  saveWorkout,
  savedWorkouts,
  loadWorkout,
  updateWorkout,
  deleteWorkout
}) {
  const [selectedWorkout, setSelectedWorkout] = useState("");
  return (
    <div className="h-full overflow-auto w-full flex flex-col">
      < h2> Workout Options</h2 >
      {/* <input
        type="text"
        placeholder="Workout Name"
        value={workoutName}
        onChange={(e) => setWorkoutName(e.target.value)}
      />
      <button onClick={() => saveWorkout(workoutName)}>Save Workout</button>
      <select
        value={selectedWorkout}
        onChange={(e) => setSelectedWorkout(e.target.value)}
      >
        <option value="">Select Workout</option>
        {Object.keys(savedWorkouts).map((name) => (
          <option key={name} value={name}>
            {name}
          </option>
        ))}
      </select>
      <button onClick={() => loadWorkout(selectedWorkout)}>
        Load Workout
      </button>
      <button onClick={() => updateWorkout(selectedWorkout)}>
        Update Workout
      </button>
      <button onClick={() => deleteWorkout(selectedWorkout)}>
        Delete Workout
      </button> */}
      <div className='grow overflow-auto'>
        <Table className="ml-2 mr-2" >
          <TableHeader>
            <TableRow>
              {/* <TableHead></TableHead> */}
              <TableHead className="pl-0">Name</TableHead>
              <TableHead className="text-center">Exercises</TableHead>
              <TableHead className="text-right pr-0">Actions</TableHead>
              {/* <TableHead></TableHead> */}
            </TableRow>
          </TableHeader>
          <TableBody>
            {Object.keys(savedWorkouts).reverse().map((name) => (
              <SavedWorkout key={name} name={name} workout={savedWorkouts[name]} loadWorkout={loadWorkout} updateWorkout={updateWorkout} deleteWorkout={deleteWorkout} />
            ))}
          </TableBody>
        </Table>
      </div>

      <div className='flex flex-row gap-2'>
        <Input type="text" placeholder="Untitled Workout" value={workoutName} onChange={(e) => setWorkoutName(e.target.value)} />
        <div><Button variant="outline" size="icon" className="mr-2" onClick={() => { saveWorkout(workoutName) }}>
          <Plus />
        </Button></div>
      </div>

      {/* <div className="flex flex-col w-full">
        {Object.keys(savedWorkouts).map((name) => (
          <SavedWorkout key={name} name={name} workout={savedWorkouts[name]} loadWorkout={loadWorkout} updateWorkout={updateWorkout} deleteWorkout={deleteWorkout} />
        ))}
      </div> */}
    </div >
  )
}

function SavedWorkout({
  name,
  workout,
  loadWorkout,
  updateWorkout,
  deleteWorkout
}) {
  return (<TableRow>
    {/* <TableCell></TableCell> */}
    <TableCell>
      {name}
    </TableCell>
    <TableCell className="text-center">
      {workout.length}
    </TableCell>
    <TableCell className="flex flex-row gap-2 justify-end">
      <WorkoutActions workoutName={name} loadWorkout={loadWorkout} updateWorkout={updateWorkout} deleteWorkout={deleteWorkout} />
      <Button variant="outline" size="icon" onClick={() => { loadWorkout(workout) }}><Play /></Button>
    </TableCell>
    {/* <TableCell></TableCell> */}
  </TableRow>)
  // return (
  //   <Button variant="outline" className="float-none flex justify-between mb-2">
  //     <span>{name}</span>
  //     <div>
  //       <span>{workout.length} Exercises</span>
  //       <WorkoutActions workoutName={name} loadWorkout={loadWorkout} updateWorkout={updateWorkout} deleteWorkout={deleteWorkout} />
  //     </div>
  //   </Button>
  // )
}

function WorkoutActions({
  workoutName, loadWorkout, updateWorkout, deleteWorkout
}) {
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
        <DropdownMenuItem onClick={() => confirm("Overwrite workout?") && updateWorkout(workoutName)}>
          Update Workout
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => confirm("Are you sure you want to delete this workout?") && deleteWorkout(workoutName)}>
          Delete Workout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}