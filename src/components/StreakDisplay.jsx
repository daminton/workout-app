import { Card } from "@/components/ui/card";
import { Flame } from "lucide-react";

const StreakDisplay = () => {
  return (
    <Card className="p-2">
      <div className="flex items-center gap-2">
        <span className="text-sm text-muted-foreground">Streak:</span>
        <span className="font-bold">
          {localStorage.getItem("workoutStreak") || 0}
        </span>
        <span className="text-sm text-muted-foreground">days</span>
        <Flame className="h-4 w-4 text-orange-500 ml-auto" />
      </div>
    </Card>
  );
};

export default StreakDisplay;
