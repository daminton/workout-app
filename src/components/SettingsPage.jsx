import { useRef } from "react";
import { ModeToggle } from "./mode-toggle";
import { Download, Upload, Trash2 } from "lucide-react";
import SettingsItem from "./SettingsItem";
import SavedWorkoutsList from "./SavedWorkoutsList";
import useAppStore from "@store";

const SettingsPage = ({
  exportWorkoutInformation,
  importWorkoutInformation,
}) => {
  const resetState = useAppStore((state) => state.resetState);
  const fileInputRef = useRef(null);

  const handleImportClick = () => {
    fileInputRef.current.click();
  };

  return (
    <div className="flex items-center flex-col h-full w-full px-2 relative">
      <SavedWorkoutsList />
      <div className="flex flex-row gap-5 w-full absolute bottom-20 px-5">
        <SettingsItem label={"Import"} onClick={handleImportClick}>
          <input
            type="file"
            ref={fileInputRef}
            style={{ display: "none" }}
            onChange={(e) =>
              confirm("Overwrite all existing workout data?") &&
              importWorkoutInformation(e.target.files[0])
            }
          />
          <Upload />
        </SettingsItem>
        <SettingsItem label={"Export"} onClick={exportWorkoutInformation}>
          <Download />
        </SettingsItem>
        <ModeToggle />
        <SettingsItem
          label={"Clear"}
          onClick={() =>
            confirm("Are you sure you want to clear all data?") && resetState()
          }
        >
          <Trash2 />
        </SettingsItem>
      </div>
    </div>
  );
};

export default SettingsPage;
