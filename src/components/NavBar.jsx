import { Button } from "./ui/button";
import { Dumbbell, Timer, Settings } from "lucide-react";
import { Separator } from "./ui/separator";

const NavBar = ({ setCurrentPage, currentPage, setDate }) => {
  return (
    <div className="fixed bottom-0 h-[60px] w-full flex flex-row justify-center gap-9 py-2 border-t-2">
      <Button onClick={() => {
        if (currentPage == "workout") {
          setDate(new Date())
        } else {
          setCurrentPage("workout")
        }
      }}>
        <Dumbbell />
      </Button>
      <Separator orientation="vertical" />
      <Button onClick={() => setCurrentPage("timer")}>
        <Timer />
      </Button>
      <Separator orientation="vertical" />
      <Button onClick={() => setCurrentPage("settings")}>
        <Settings />
      </Button>
    </div>
  );
};

export default NavBar;
