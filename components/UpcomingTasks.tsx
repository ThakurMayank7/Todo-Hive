import React from "react";
import { ScrollArea } from "./ui/scroll-area";

function UpcomingTasks() {
  return (
    <div className="bg-gray-200 h-full rounded p-2">
      <ScrollArea className="h-full w-full">
        {[
          "1",
          "2",
          "3",
          "4",
          "5",
          "6",
          "7",
          "8",
          "9",
          "10",
          "11",
          "12",
          "13",
          "14",
          "15",
        ].map((item, index) => (
          <div key={index} className="bg-white p-2 rounded shadow-lg mb-2">
            <div className="flex flex-row items-center">
              <div className="flex flex-col">
                <div className="font-semibold">Task {item}</div>
                <div className="text-sm text-gray-500">Category</div>
              </div>
              <div className="ml-auto">
                <button className="bg-teal-500 text-white rounded px-2 py-1">
                  Mark as done
                </button>
              </div>
            </div>
          </div>
        ))}
      </ScrollArea>
      j
    </div>
  );
}

export default UpcomingTasks;
