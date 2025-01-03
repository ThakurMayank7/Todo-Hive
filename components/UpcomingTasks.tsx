import React from "react";
import { ScrollArea } from "./ui/scroll-area";

import { SimpleTreeView } from "@mui/x-tree-view/SimpleTreeView";
import { TreeItem } from "@mui/x-tree-view/TreeItem";
import { useUserContext } from "@/context/UserContext";

import { IoIosCheckbox } from "react-icons/io";
import { MdOutlineCheckBoxOutlineBlank } from "react-icons/md";

function UpcomingTasks() {
  const { userData } = useUserContext();

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
                      <div className="ml-auto">
                        {subtask.sStatus ? (
                          <IoIosCheckbox />
                        ) : (
                          <MdOutlineCheckBoxOutlineBlank />
                        )}
                      </div>
                    </div>
                  ))}
                </TreeItem>
              </SimpleTreeView>
            )}
          </div>
        ))}

        {/* <SimpleTreeView>
        <TreeItem itemId="pickers" label="Date and Time Pickers">
          <TreeItem itemId="pickers-community" label="@mui/x-date-pickers" />
          <TreeItem itemId="pickers-pro" label="@mui/x-date-pickers-pro" />
        </TreeItem>
        <TreeItem itemId="charts" label="Charts">
          <TreeItem itemId="charts-community" label="@mui/x-charts" />
        </TreeItem>
        <TreeItem itemId="tree-view" label="Tree View">
          <TreeItem itemId="tree-view-community" label="@mui/x-tree-view" />
        </TreeItem>
      </SimpleTreeView> */}
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
    </div>
  );
}

export default UpcomingTasks;
