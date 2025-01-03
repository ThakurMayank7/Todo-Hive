"use client";

import React from "react";
import { ScrollArea } from "./ui/scroll-area";

import { SimpleTreeView } from "@mui/x-tree-view/SimpleTreeView";
import { TreeItem } from "@mui/x-tree-view/TreeItem";
import { useUserContext } from "@/context/UserContext";

import { IoIosCheckbox } from "react-icons/io";
import { MdOutlineCheckBoxOutlineBlank } from "react-icons/md";
import { updateSubTask } from "@/actions/actions";
import { Task } from "@/lib/types";

function UpcomingTasks() {
  const { userData } = useUserContext();

  const updateSubTasks = ({
    taskId,
    subTask,
  }: {
    taskId: string;
    subTask: string;
  }) => {

    const copy:Task[]=userData?.tasks.filter((task:Task) => task.taskId === taskId)||[];

if(copy!==undefined && copy.length!==0){
  
  const newSubTasks: { sTask: string; sStatus: boolean }[] = copy[0].subTasks?.map((sub) => {
    if (sub.sTask === subTask) {
      sub.sStatus = !sub.sStatus;
    }
    return sub;
  })||[];

  if(newSubTasks!==undefined && newSubTasks.length!==0){
    updateSubTask({
      taskId,
      newSubTasks,
    });
}
};}

  return (
    <div className="bg-gray-200 h-full rounded p-2">
      <ScrollArea className="h-full w-full bg-white rounded">
        {userData?.tasks.map((task) => (
          <div
            key={task.taskId}
            className="flex flex-col bg-white rounded shadow-lg p-2 my-2 "
          >
            <div className="flex flex-row gap-4 items-center">
              <span className="text-xl">{task.taskName}</span>
              <span className="text-md bg-teal-600 text-white rounded p-1">
                {task.list}
              </span>
            </div>
            <div className="flex-1 py-2">
              {task.tags?.map((tag) => (
                <span
                  key={tag}
                  className="bg-teal-100 rounded p-2 text-sm font-serif m-1"
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
                      <span>{subtask.sTask}</span>
                      <div className="ml-auto flex flex-row items-center">
                        {subtask.sStatus?"true":"false"}
                        {subtask.sStatus ? (
                          <IoIosCheckbox
                          // onClick={() => {
                          //   updateSubTask({
                          //     taskId: task.taskId,
                          //     subTask: subtask.sTask,
                          //     status: !subtask.sStatus,
                          //   });
                          // }}
                          />
                        ) : (
                          <MdOutlineCheckBoxOutlineBlank
                          onClick={() => updateSubTasks({taskId: task.taskId,subTask: subtask.sTask})}
                          />
                        )}
                      </div>
                    </div>
                  ))}
                </TreeItem>
              </SimpleTreeView>
            )}
          </div>
        ))}
      </ScrollArea>
    </div>
  );
}

export default UpcomingTasks;
