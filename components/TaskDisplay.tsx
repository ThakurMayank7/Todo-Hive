"use client";

import { notifyUpdates, updateSubTask } from "@/actions/actions";
import { useUserContext } from "@/context/UserContext";
import { useAuth } from "@/hooks/useAuth";
import { updateTaskStatusHandler } from "@/lib/databaseUpdates";
import { Task } from "@/lib/types";
import { SimpleTreeView } from "@mui/x-tree-view/SimpleTreeView";
import { TreeItem } from "@mui/x-tree-view/TreeItem";
import { Dot } from "lucide-react";
import React from "react";
import { IoIosCheckbox } from "react-icons/io";
import { MdOutlineCheckBoxOutlineBlank } from "react-icons/md";
import { toast } from "sonner";

function TaskDisplay({ task }: { task: Task }) {
  const { userData } = useUserContext();

  const { user } = useAuth();

  const updateSubTasks = async ({
    taskId,
    subTask,
  }: {
    taskId: string;
    subTask: string;
  }) => {
    const copy: Task | undefined = userData?.tasks
      .filter((task: Task) => task.taskId === taskId)
      .at(0);

    if (copy !== undefined) {
      const newSubTasks: { sTask: string; sStatus: boolean }[] =
        copy.subTasks?.map((sub) => {
          if (sub.sTask === subTask) {
            sub.sStatus = !sub.sStatus;
          }
          return sub;
        }) || [];

      if (newSubTasks !== undefined && newSubTasks.length !== 0) {
        await updateSubTask({
          taskId,
          newSubTasks,
        }).then((result) => {
          if (result && user) {
            notifyUpdates({
              userId: user.uid,
              taskId: taskId,
            });
          }
        });
      }
    }
  };

  return (
    <div className="flex flex-col bg-white rounded shadow-lg p-2 my-2 ">
      <div className="flex flex-row gap-4 items-center">
        <span className="text-xl">{task.taskName}</span>
        <span className="text-md bg-teal-600 text-white rounded p-1">
          {task.list}
        </span>
        <div className="ml-auto">
          {task.status ? (
            <span className="bg-green-500 text-white rounded p-1 border-2 border-green-800">
              Completed
            </span>
          ) : (
            <button
              className="bg-cyan-400 rounded border-2 border-cyan-900 hover:bg-cyan-600 p-1 text-white"
              onClick={() => {
                if (user) {
                  updateTaskStatusHandler({
                    taskId: task.taskId,
                    userId: user.uid,
                  });
                }
              }}
            >
              Mark Done
            </button>
          )}
        </div>
      </div>
      <div className="flex-1 py-2">
        {task.tags?.map((tag) => (
          <span
            key={tag}
            className={`${
              tag === "Important" ? "bg-red-400" : "bg-gray-200"
            } rounded p-2 text-sm font-serif m-1 border border-black`}
          >
            {tag}
          </span>
        ))}
      </div>

      {task.subTasks && task.subTasks.length > 0 && (
        <SimpleTreeView className="bg-gray-200 rounded">
          <TreeItem
            itemId="pickers"
            label={
              <div>
                <h1 className="text-sm">View Sub Tasks</h1>
              </div>
            }
          >
            {task.subTasks.map((subtask) => (
              <div
                key={subtask.sTask}
                className="bg-gray-100 my-0.5 rounded p-0.5 flex flex-row items-center"
              >
                <Dot />
                <span>{subtask.sTask}</span>
                <div className="ml-auto flex flex-row items-center">
                  {subtask.sStatus ? (
                    <IoIosCheckbox
                      onClick={() => {
                        if (task.status === false) {
                          updateSubTasks({
                            taskId: task.taskId,
                            subTask: subtask.sTask,
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
                        if (task.status === false) {
                          updateSubTasks({
                            taskId: task.taskId,
                            subTask: subtask.sTask,
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
              </div>
            ))}
          </TreeItem>
        </SimpleTreeView>
      )}
    </div>
  );
}

export default TaskDisplay;
