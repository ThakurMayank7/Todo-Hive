import React from "react";
import NumberTicker from "./ui/number-ticker";
import { useUserContext } from "@/context/UserContext";
import { CheckUpcomingDate } from "@/lib/utils/functions";

function DueTasks() {
  const { userData } = useUserContext();

  return (
    <div className="w-full h-full bg-amber-400 rounded p-2 shadow-sm">
      <h1 className="text-white dark:text-white text-center text-xl">
        Due Tasks
      </h1>
      <p className="whitespace-pre-wrap text-8xl font-medium tracking-tighter text-green-500 dark:text-white text-center mb-1">
        {userData?.tasks.filter(
          (task) => CheckUpcomingDate(task.dueDate) && task.status === false
        ).length === 0 ? (
          "0"
        ) : (
          <NumberTicker
            className="text-white"
            value={
              userData?.tasks.filter(
                (task) =>
                  CheckUpcomingDate(task.dueDate) && task.status === false
              ).length || 0
            }
          />
        )}
      </p>
    </div>
  );
}

export default DueTasks;
