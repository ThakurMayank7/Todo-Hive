import {
  notifyUpdates,
  updateSubTask,
  updateTaskStatus,
} from "@/actions/actions";
import { Task } from "./types";

export const updateTaskStatusHandler = async ({
  taskId,
  userId,
}: {
  taskId: string;
  userId: string;
}) => {
  await updateTaskStatus({
    taskId: taskId,
    newTaskStatus: true,
  }).then((result) => {
    if (result && userId) {
      notifyUpdates({
        userId: userId,
        taskId: taskId,
      });
    }
  });
};

export const updateSubTasks = async ({
  taskId,
  subTask,
  task,
  userId,
}: {
  taskId: string;
  subTask: string;
  task: Task;
  userId: string;
}) => {
  if (task !== undefined) {
    const newSubTasks: { sTask: string; sStatus: boolean }[] =
      task.subTasks?.map((sub) => {
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
        if (result && userId) {
          notifyUpdates({
            userId: userId,
            taskId: taskId,
          });
        }
      });
    }
  }
};
