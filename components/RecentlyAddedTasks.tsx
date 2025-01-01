"use client";

import { useUserContext } from "@/context/UserContext";
import React from "react";

function RecentlyAddedTasks() {
  const { userData } = useUserContext();

  return (
    <div>
      <h1>User Data:</h1>
      {userData?.tasks
        .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime()) // Sort by createdAt in descending order
        .map((task) => (
          <div key={task.taskId}>{task.taskName}</div>
        ))}
    </div>
  );
}

export default RecentlyAddedTasks;
