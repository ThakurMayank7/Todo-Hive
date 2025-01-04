import React from "react";
import NumberTicker from "./ui/number-ticker";
import { useUserContext } from "@/context/UserContext";

function TaskCompleted() {
  const { userData } = useUserContext();
  return (
    <div className="w-full h-full bg-emerald-500 rounded p-2 shadow-sm">
      <h1 className="text-white dark:text-white text-center text-xl">
        Tasks Completed
      </h1>
      <p className="whitespace-pre-wrap text-8xl font-medium tracking-tighter text-white dark:text-white text-center mb-1">
        {userData?.tasks.filter((task) => task.status === true).length === 0 ? (
          "0"
        ) : (
          <NumberTicker
            className="text-white"
            value={
              userData?.tasks.filter((task) => task.status === true).length || 0
            }
          />
        )}
      </p>
    </div>
  );
}

export default TaskCompleted;
