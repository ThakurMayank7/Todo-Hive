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

function TaskDetailedView({ task }: { task: Task }) {
  return (
    <Card className="flex flex-row bg-gray-200 my-2">
      <div className="w-5/6">

      <CardHeader>
        <CardTitle>{task.taskName}</CardTitle>
        <CardDescription>{task.taskDescription}</CardDescription>
      </CardHeader>
      <CardContent>
        <p>Card Content</p>
      </CardContent>
      <CardFooter>
        <p>Card Footer</p>
      </CardFooter>
      </div>
      <div className="w-1/6">here</div>
    </Card>
  );
}

export default TaskDetailedView;
