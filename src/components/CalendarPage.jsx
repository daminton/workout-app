import React, { useState, useEffect, useMemo } from "react";
import { Card } from "@/components/ui/card";
import { Flame } from "lucide-react";
import StreakDisplay from "./StreakDisplay";
import { ChevronRightIcon, ChevronLeftIcon } from "lucide-react";
import { Button } from "./ui/button";
import useAppStore from "@store";

const CalendarPage = ({ exercisesByDate, currentUser, workoutNames }) => {
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [workoutStreak, setWorkoutStreak] = useState(0);
  const setCurrentDate = useAppStore((state) => state.setCurrentDate);
  const setCurrentPage = useAppStore((state) => state.setCurrentPage);

  // Calculate streak on component mount and when data changes
  useEffect(() => {
    const calculateStreak = () => {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      let streak = 0;
      let currentDate = new Date(today);

      while (true) {
        const dateStr = currentDate.toISOString().split("T")[0];
        const hasWorkout = hasWorkoutOnDate(currentUser, dateStr).doesKeyExist;

        if (!hasWorkout) break;

        streak++;
        currentDate.setDate(currentDate.getDate() - 1);
      }

      return streak;
    };

    const streak = calculateStreak();
    setWorkoutStreak(streak);
    localStorage.setItem("workoutStreak", streak);
  }, [exercisesByDate, currentUser]);

  const months = {
    0: "January",
    1: "February",
    2: "March",
    3: "April",
    4: "May",
    5: "June",
    6: "July",
    7: "August",
    8: "September",
    9: "October",
    10: "November",
    11: "December",
  };

  const getDaysInMonth = (month, year) =>
    new Date(year, month + 1, 0).getDate();
  const getFirstDayOfMonth = (month, year) => new Date(year, month, 1).getDay();

  const hasWorkoutOnDate = (user, dateStr) => {
    if (!exercisesByDate[user])
      return { doesKeyExist: false, existingKey: null };

    const existingKey = Object.keys(exercisesByDate[user]).find(
      (key) => key.startsWith(dateStr) && exercisesByDate[user][key]?.length > 0
    );

    return {
      doesKeyExist: !!existingKey,
      existingKey,
    };
  };

  const getWorkoutName = (user, dateStr) => {
    const { existingKey } = hasWorkoutOnDate(user, dateStr);
    if (!existingKey) return null;

    return workoutNames[existingKey] || "Workout";
  };

  const handleDayClick = (date) => {
    const selectedDate = new Date(currentYear, currentMonth, date);
    selectedDate.setHours(0, 0, 0, 0);
    setCurrentDate(selectedDate.toISOString());
    setCurrentPage("workout");
  };

  const calendar = useMemo(() => {
    const daysInMonth = getDaysInMonth(currentMonth, currentYear);
    const firstDay = getFirstDayOfMonth(currentMonth, currentYear);
    const calendar = [];
    let week = new Array(7).fill(null);

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const todayStr = today.toISOString().split("T")[0];

    const streakStartDate = new Date(today);
    streakStartDate.setDate(today.getDate() - workoutStreak + 1);
    const streakStartStr = streakStartDate.toISOString().split("T")[0];

    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(currentYear, currentMonth, day);
      date.setHours(0, 0, 0, 0);
      const dateStr = date.toISOString().split("T")[0];
      const dayIndex = (firstDay + day - 1) % 7;

      const hasWorkout = hasWorkoutOnDate(currentUser, dateStr);
      const workoutName = getWorkoutName(currentUser, dateStr);

      const isInStreak =
        dateStr >= streakStartStr &&
        dateStr <= todayStr &&
        hasWorkout.doesKeyExist;

      week[dayIndex] = {
        date: day,
        workoutName,
        hasWorkout: hasWorkout.doesKeyExist,
        isToday: dateStr === todayStr,
        isInStreak,
      };

      if (dayIndex === 6 || day === daysInMonth) {
        calendar.push(week);
        week = new Array(7).fill(null);
      }
    }

    return calendar;
  }, [
    currentMonth,
    currentYear,
    workoutStreak,
    exercisesByDate,
    workoutNames,
    currentUser,
  ]);

  return (
    <div className="p-4 h-[calc(100vh-60px)]">
      <div className="pb-4">
        <StreakDisplay />
      </div>
      <div className="flex justify-between items-center mb-4">
        <Button
          variant="outline"
          size="icon"
          onClick={() => {
            if (currentMonth === 0) {
              setCurrentMonth(11);
              setCurrentYear(currentYear - 1);
            } else {
              setCurrentMonth(currentMonth - 1);
            }
          }}
        >
          <ChevronLeftIcon className="h-4 w-4" />
        </Button>
        <div className="text-center">
          <h2 className="text-xl font-bold">
            {months[currentMonth]} {currentYear}
          </h2>
        </div>

        <Button
          variant="outline"
          size="icon"
          onClick={() => {
            if (currentMonth === 11) {
              setCurrentMonth(0);
              setCurrentYear(currentYear + 1);
            } else {
              setCurrentMonth(currentMonth + 1);
            }
          }}
        >
          <ChevronRightIcon className="h-4 w-4" />
        </Button>
      </div>

      <div className="grid grid-cols-7 gap-1">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
          <div key={day} className="text-center font-semibold p-2">
            {day}
          </div>
        ))}

        {calendar.map((week, weekIndex) =>
          week.map((day, dayIndex) => (
            <Card
              key={`${weekIndex}-${dayIndex}`}
              className={`p-2 h-24 flex flex-col cursor-pointer hover:bg-gray-50
                ${day?.isToday ? "border-blue-500 border-2" : ""}
                ${day?.hasWorkout ? "border-blue-50" : ""}
                ${day?.isInStreak ? "border-orange-300 border-2" : ""}
                rounded-lg shadow-sm`}
              onClick={() => day && handleDayClick(day.date)}
            >
              {day && (
                <>
                  <div className="flex justify-between items-start">
                    <span className={day.hasWorkout ? "font-semibold" : ""}>
                      {day.date}
                    </span>
                    {day.isInStreak && (
                      <Flame className="w-4 h-4 text-orange-500" />
                    )}
                  </div>
                  {day.hasWorkout && (
                    <div className="text-sm mt-auto text-blue-600 line-clamp-2 break-words">
                      {day.workoutName}
                    </div>
                  )}
                </>
              )}
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

export default CalendarPage;
