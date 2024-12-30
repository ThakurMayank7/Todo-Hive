"use client";

import CategoryChart from "@/components/CategoryChart";
import DueTasks from "@/components/DueTasks";
import OverdueTasks from "@/components/OverdueTasks";
import RecentlyAddedTasks from "@/components/RecentlyAddedTasks";
import TaskCompleted from "@/components/TaskCompleted";
import UpcomingTasks from "@/components/UpcomingTasks";
import { Plus } from "lucide-react";
import React from "react";

function HomePage() {
  return (
    <div className="h-full w-full">
      <div className="flex flex-row gap-2 h-1/5 w-full">
        <div className="w-1/4">
        <TaskCompleted />
        </div>
        <div className="w-1/4">
        <DueTasks />
        </div>
        <div className="w-1/4">
        <OverdueTasks />
        </div>
        <div className="w-1/4 flex flex-col gap-4 items-center justify-center">
          <button className="bg-white border-2 border-teal-900 p-4 flex flex-row gap-2 w-full rounded shadow-lg hover:bg-teal-100 hover:font-bold font-semibold items-center justify-center"><Plus/>Add new task</button>
          <button className="bg-white border-2 border-teal-900 p-4 flex flex-row gap-2 w-full rounded shadow-lg hover:bg-teal-100 hover:font-bold font-semibold items-center justify-center"><Plus/>Add new list</button>
        </div>
      </div>
      <div className="flex flex-row h-4/5 pt-2">
        <div className="w-1/2 pr-1">
          <UpcomingTasks />
        </div>
        <div className="w-1/2 flex flex-col h-full pl-1">
          <div className="h-1/2">
            <CategoryChart />
          </div>
          <div className="h-1/2">
            <RecentlyAddedTasks />
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
