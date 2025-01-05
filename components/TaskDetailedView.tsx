import { Task } from "@/lib/types";
import React from "react";

function TaskDetailedView({ task }: { task: Task }) {
  return <div>{task.taskId}</div>;
}

export default TaskDetailedView;
