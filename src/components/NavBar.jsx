import { Button } from "./ui/button";
import { Dumbbell, Calendar, Settings } from "lucide-react";
import { Separator } from "./ui/separator";
import { timeToZero } from "@/lib/utils";
import useAppStore from "@store";

const NavBar = () => {
  const currentPage = useAppStore((state) => state.currentPage);
  const setCurrentPage = useAppStore((state) => state.setCurrentPage);
  const setCurrentDate = useAppStore((state) => state.setCurrentDate);
  return (
    <div className="fixed bottom-0 h-[60px] w-full flex flex-row justify-center gap-9 py-2 border-t-2 backdrop-blur-sm">
      <Button
        onClick={() => {
          if (currentPage == "workout") {
            setCurrentDate(timeToZero(new Date()).toISOString());
          } else {
            setCurrentPage("workout");
          }
        }}
      >
        <Dumbbell />
      </Button>
      <Separator orientation="vertical" />
      <Button onClick={() => setCurrentPage("calendar")}>
        <Calendar />
      </Button>
      <Separator orientation="vertical" />
      <Button onClick={() => setCurrentPage("settings")}>
        <Settings />
      </Button>
    </div>
  );
};

export default NavBar;
