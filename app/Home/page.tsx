"use client";

import DueTasks from "@/components/DueTasks";
import OverdueTasks from "@/components/OverdueTasks";
import TaskCompleted from "@/components/TaskCompleted";
import React from "react";

function HomePage() {
  return (
    <div>
      <div className="flex flex-row gap-2">
        <TaskCompleted />
        <DueTasks />
        <OverdueTasks />
      </div>
    </div>
  );
}

export default HomePage;
