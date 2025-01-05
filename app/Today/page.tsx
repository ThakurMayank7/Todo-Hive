import TaskDetailedView from "@/components/TaskDetailedView";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useUserContext } from "@/context/UserContext";
import React from "react";

function Today() {
  const { userData } = useUserContext();

  return (
    <>
      <h1 className="text-xl font-serif text-center">
        Your Tasks for Today :{" "}
      </h1>
      <ScrollArea className="">
        {userData && userData.tasks && userData.tasks.length > 0 ? (
          userData.tasks.map((task) => (
            <TaskDetailedView key={task.taskId} task={task} />
          ))
        ) : (
          <div className="mt-96">
            <span className="text-2xl font-semibold">No Tasks for Today</span>
          </div>
        )}
      </ScrollArea>
    </>
  );
}

export default Today;
