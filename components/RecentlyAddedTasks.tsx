"use client";

import { useUserContext } from "@/context/UserContext";
import React from "react";
import { ScrollArea } from "./ui/scroll-area";
import TaskDisplay from "./TaskDisplay";

function RecentlyAddedTasks() {
  const { userData } = useUserContext();

  return (
    <div className="bg-gray-200 h-full rounded p-2">
      <ScrollArea className="h-full w-full bg-gray-200 rounded">
        <h1>Recently Added Tasks</h1>
        {userData?.tasks
          .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime()) // Sort by createdAt in descending order
          .map((task, index) => {
            if (index < 10) {
              return <TaskDisplay task={task} key={task.taskId} />;
            }
            return null;
          })}
      </ScrollArea>
    </div>
  );
}

export default RecentlyAddedTasks;
