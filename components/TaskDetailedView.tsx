"use client";

import { Task } from "@/lib/types";
import React from "react";

import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { updateSubTasks, updateTaskStatusHandler } from "@/lib/databaseUpdates";
import { useAuth } from "@/hooks/useAuth";
import { Separator } from "./ui/separator";
import { Dot } from "lucide-react";
import { toast } from "sonner";
import { MdOutlineCheckBoxOutlineBlank } from "react-icons/md";
import { IoIosCheckbox } from "react-icons/io";

function TaskDetailedView({ task }: { task: Task }) {
  const { user } = useAuth();

  return (
    <Card
      className={`flex flex-col w-full ${
        task.status ? "bg-green-200" : "bg-gray-200"
      } py-2`}
    >
      <CardHeader className="text-center">
        <CardTitle>
          <span className="text-xl">{task.taskName}</span>
          <span className="text-sm text-gray-500 ml-2 rounded border border-black p-0.5">
            {task.list}
          </span>
          <Separator className="mt-2 bg-black" />
        </CardTitle>
        <CardDescription>{task.taskDescription}</CardDescription>
      </CardHeader>

      <div className="flex-1 flex items-center justify-center gap-2">
        {task.tags &&
          task.tags.length > 0 &&
          task.tags.map((tag) => (
            <span
              key={tag}
              className={`${
                tag === "Important" ? "bg-red-600" : "bg-gray-600"
              } text-white rounded-md p-1 text-sm font-semibold border border-black px-2`}
            >
              {tag}
            </span>
          ))}
      </div>
      <div className="px-8 mt-4">
        {task.subTasks &&
          task.subTasks.length > 0 &&
          task.subTasks.map((subTask, index) => (
            <div key={index} className="flex flex-row items-center gap-2">
              <Dot />
              {subTask.sTask}
              {subTask.sStatus ? (
                <IoIosCheckbox
                  onClick={() => {
                    if (task.status === false && task.subTasks && user?.uid) {
                      updateSubTasks({
                        taskId: task.taskId,
                        subTask: subTask.sTask,
                        task: task,
                        userId: user?.uid,
                      });
                    } else {
                      toast(
                        <div>
                          <h1 className="text-xl font-serif">
                            Task has already been Completed
                          </h1>
                          <p className="">
                            Cannot edit Sub Tasks after a task has been
                            completed.
                          </p>
                        </div>
                      );
                    }
                  }}
                />
              ) : (
                <MdOutlineCheckBoxOutlineBlank
                  onClick={() => {
                    if (task.status === false && task.subTasks && user?.uid) {
                      updateSubTasks({
                        taskId: task.taskId,
                        subTask: subTask.sTask,
                        task: task,
                        userId: user?.uid,
                      });
                    } else {
                      toast(
                        <div>
                          <h1 className="text-xl font-serif">
                            Task has already been Completed
                          </h1>
                          <p className="">
                            Cannot edit Sub Tasks after a task has been
                            completed.
                          </p>
                        </div>
                      );
                    }
                  }}
                />
              )}
            </div>
          ))}
      </div>

      {!task.status && (
        <CardFooter className="flex items-center justify-center mt-4">
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
