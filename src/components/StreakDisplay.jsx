import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Flame } from "lucide-react";

const StreakDisplay = () => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Current Streak</CardTitle>
        <Flame className="h-4 w-4 text-orange-500" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">
          {localStorage.getItem("workoutStreak") || 0} days
        </div>
      </CardContent>
    </Card>
  );
};

export default StreakDisplay;
