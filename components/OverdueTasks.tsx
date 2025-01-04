import React from "react";
import NumberTicker from "./ui/number-ticker";

function OverdueTasks() {
  return (
    <div className="w-full h-full bg-orange-400  rounded p-2 shadow-sm">OverdueTasks
    
    <p className="whitespace-pre-wrap text-8xl font-medium tracking-tighter text-black dark:text-white">
          <NumberTicker value={100} />
        </p>
    </div>
  );
}

export default OverdueTasks;
