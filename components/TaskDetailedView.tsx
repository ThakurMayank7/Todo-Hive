"use client";

import { Task } from "@/lib/types";
import React from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "./ui/badge";
import { updateTaskStatusHandler } from "@/lib/databaseUpdates";
import { useAuth } from "@/hooks/useAuth";
import { Separator } from "./ui/separator";

function TaskDetailedView({ task }: { task: Task }) {
  const { user } = useAuth();

  return (
    <Card
      className={`flex flex-col w-full ${
        task.status ? "bg-green-200" : "bg-gray-200"
      } my-2`}
    >
      <CardHeader className="text-center">
        <CardTitle>
          <span className="text-xl">{task.taskName}</span>
          <Badge
            className="ml-4"
            variant={`${task.status ? "default" : "destructive"}`}
          >
            {task.status ? "Completed" : "Incomplete"}
          </Badge>
          <Separator />
        </CardTitle>
        <CardDescription>{task.taskDescription}</CardDescription>
      </CardHeader>
      {task.subTasks && task.subTasks.length > 0 && (
        <CardContent>
          <p>Card Content</p>
        </CardContent>
      )}

      {!task.status && (
        <CardFooter className="flex items-center justify-center">
          <button
            className="bg-gray-800 text-white p-1 rounded shadow shadow-gray-700 hover:font-semibold hover:bg-gray-600"
            onClick={() => {
              if (user) {
                updateTaskStatusHandler({
                  taskId: task.taskId,
                  userId: user.uid,
                });
              }
            }}
          >
            Mark As Done
          </button>
        </CardFooter>
      )}
    </Card>
  );
}

export default TaskDetailedView;
