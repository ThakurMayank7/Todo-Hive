import React from "react";
import NumberTicker from "./ui/number-ticker";

function TaskCompleted() {
  return (
    <div className="w-full h-full bg-emerald-500 rounded p-2 shadow-sm">
      TaskCompleted

      <p className="whitespace-pre-wrap text-8xl font-medium tracking-tighter text-black dark:text-white">
            <NumberTicker value={100} />
          </p>
    </div>
  );
}

export default TaskCompleted;
