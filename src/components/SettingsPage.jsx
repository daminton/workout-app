import { useRef, useState } from "react";
import { ModeToggle } from "./mode-toggle";
import { Download, Upload } from "lucide-react";
import SettingsItem from "./SettingsItem";

const SettingsPage = ({
  workoutName,
  setWorkoutName,
  saveWorkout,
  loadWorkout,
  deleteWorkout,
  updateWorkout,
  savedWorkouts,
  exportWorkoutInformation,
  importWorkoutInformation,
}) => {
  const fileInputRef = useRef(null);
  const [selectedWorkout, setSelectedWorkout] = useState("");

  const handleImportClick = () => {
    fileInputRef.current.click();
  };

  return (
    <div className="fixed bottom-[60px] top-0 left-0 right-0 flex flex-row justify-center">
      <div className="p-5 max-w-lg flex flex-col">
        <div className="h-full">
          <h2>Workout Options</h2>
          <input
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
          </button>
        </div>
        <div className="flex flex-row gap-5">
          <SettingsItem label={"Import"} onClick={handleImportClick}>
            <input
              type="file"
              ref={fileInputRef}
              style={{ display: "none" }}
              onChange={(e) => importWorkoutInformation(e.target.files[0])}
            />
            <Upload />
          </SettingsItem>
          <SettingsItem label={"Export"} onClick={exportWorkoutInformation}>
            <Download />
          </SettingsItem>
          <ModeToggle />
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
