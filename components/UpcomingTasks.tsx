"use client";

import React from "react";
import { ScrollArea } from "./ui/scroll-area";
import { useUserContext } from "@/context/UserContext";
import { Task } from "@/lib/types";
import TaskDisplay from "./TaskDisplay";
import { Separator } from "./ui/separator";

function UpcomingTasks() {
  const { userData } = useUserContext();

  return (
    <div className="bg-gray-200 h-full rounded p-2">
      <ScrollArea className="h-full w-full bg-gray-100 rounded">
        {userData?.tasks && userData.tasks.length > 0 && (
          <div className="p-1 border border-black rounded bg-gray-200 px-2">
            <h1>Today</h1>

            {userData.tasks.map((task: Task) => {
              const dueDate: Date = task.dueDate;

              if (
                dueDate.getDate() === new Date().getDate() &&
                dueDate.getMonth() === new Date().getMonth() &&
                dueDate.getFullYear() === new Date().getFullYear()
              )
                return <TaskDisplay task={task} key={task.taskId} />;
            })}
          </div>
        )}
        {userData?.tasks && userData.tasks.length > 0 && (
          <>
            <Separator className="my-1" />
            <div className="p-1 border border-black rounded bg-gray-200 px-2">
              <h1>Tomorrow</h1>

              {userData.tasks.map((task: Task) => {
                const dueDate: Date = task.dueDate;

                if (
                  dueDate.getDate() === new Date().getDate() + 1 &&
                  dueDate.getMonth() === new Date().getMonth() &&
                  dueDate.getFullYear() === new Date().getFullYear()
                )
                  return <TaskDisplay task={task} key={task.taskId} />;
              })}
            </div>
          </>
        )}
        {userData?.tasks && userData.tasks.length > 0 && (
          <>
            <Separator className="my-1" />
            <div className="p-1 border border-black rounded bg-gray-200 px-2">
              <h1>Tomorrow</h1>

              {userData.tasks.map((task: Task) => {
                const dueDate: Date = task.dueDate;

                if (
                  dueDate.getDate() > new Date().getDate() + 2 &&
                  dueDate.getDate() < new Date().getDate() + 7 &&
                  dueDate.getMonth() === new Date().getMonth() &&
                  dueDate.getFullYear() === new Date().getFullYear()
                )
                  return <TaskDisplay task={task} key={task.taskId} />;
              })}
            </div>
          </>
        )}

        {userData?.tasks && userData.tasks.length === 0 && (
          <div className="h-full flex items-center justify-center">
            <h1 className="text-xl font-semibold">No Tasks This Week</h1>
          </div>
        )}
      </ScrollArea>
    </div>
  );
}

export default UpcomingTasks;
