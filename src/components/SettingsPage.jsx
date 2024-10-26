import { useRef } from "react";
import { ModeToggle } from "./mode-toggle";
import { Download, Upload } from "lucide-react";
import SettingsItem from "./SettingsItem";
import SavedWorkoutsList from "./SavedWorkoutsList";

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

  const handleImportClick = () => {
    fileInputRef.current.click();
  };

  return (
    <div className="fixed bottom-[60px] top-0 left-0 right-0 flex flex-row justify-center">
      <div className="p-5 w-full max-w-md flex flex-col">
        <SavedWorkoutsList
          workoutName={workoutName}
          setWorkoutName={setWorkoutName}
          saveWorkout={saveWorkout}
          savedWorkouts={savedWorkouts}
          loadWorkout={loadWorkout}
          updateWorkout={updateWorkout}
          deleteWorkout={deleteWorkout}
        />
        <div className="flex flex-row gap-5 mt-2">
          <SettingsItem label={"Import"} onClick={handleImportClick}>
            <input
              type="file"
              ref={fileInputRef}
              style={{ display: "none" }}
              onChange={(e) => confirm("Overwrite all existing workout data?") && importWorkoutInformation(e.target.files[0])}
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
